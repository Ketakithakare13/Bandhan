package com.bandhan.controller;

import java.io.FileOutputStream;
import org.springframework.http.HttpHeaders;

import java.net.URI;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bandhan.config.JwtProvider;
import com.bandhan.entity.Gender;
import com.bandhan.entity.MaritialStatus;
import com.bandhan.entity.Religion;
import com.bandhan.entity.User;
import com.bandhan.exception.UserException;
import com.bandhan.repository.UserRepository;
import com.bandhan.request.LoginRequest;
import com.bandhan.response.AuthResponse;
import com.bandhan.service.UserService;
import com.bandhan.service.UserServiceImpl;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import java.awt.PageAttributes.MediaType;
import java.io.*;
import java.net.URI;
import java.util.Collections;
import java.util.HashMap;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
	
	private UserService userService;
	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;
	private UserServiceImpl userServiceImpl;
	
	
//	private static final String TWILIO_ACCOUNT_SID = "AC0a04c86b2e24145d7f00a64e73308699";
//    private static final String TWILIO_AUTH_TOKEN = "ef20447c572ffb4ba3412cb5288fc417";
//    private static final String TWILIO_WHATSAPP_NUMBER = "whatsapp:+1(415)523-8886";
//  //  private static final String TWILIO_WHATSAPP_NUMBER = "whatsapp:+1(517)743-0927";
//    private static final String REGION ="Asia Pacific (Mumbai) ap-south-1";
//    
//    
//    private static final String APP_ID = "8977339704d13e6e127026d373337798";
//    private static final String SECRET_KEY = "cfsk_ma_prod_bbabbaa827033d7ae7643f4474f1e377_58faa643";
//    private static final String API_URL = "https://sandbox.cashfree.com/pg/orders";
    
    
	public AuthController(UserService userService,UserRepository userRepository,UserServiceImpl userServiceImpl, PasswordEncoder passwordEncoder,JwtProvider jwtProvider)
	{
		this.userService=userService;
		this.userRepository=userRepository;
		this.userServiceImpl=userServiceImpl;
		this.passwordEncoder=passwordEncoder;
		this.jwtProvider=jwtProvider;
	}
	

	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException{
		
	    
	    // Extract user details from the request body
	    String email = user.getEmail();
	    String password = user.getPassword();
	    String name = user.getName();
	    String mobile = user.getMobile();
	    String dateOfBirth = user.getDateOfBirth(); // Use LocalDate if applicable
	    String location = user.getLocation();
	    String caste = user.getCaste();
	    String occupation = user.getOccupation();
	    String income = user.getIncome();
	    String photo = user.getPhoto();
	    String transactionid = user.getTransactionid();
	    String paymentstatus = user.getPaymentstatus();
	    
	   
	    
	    
	  //  String height = user.getheight

	    // Enumerated fields
	    Gender gender = user.getGender();
	    MaritialStatus maritialStatus = user.getMaritialStatus();
	  
	    Religion religion = user.getReligion();

	    // Check if email already exists in the database
	    User isEmailExist = userRepository.findByEmail(email);
	    if (isEmailExist != null) {
	        throw new UserException("Email is already used with another account");
	    }

	    // Create and populate the User entity
	    User createdUser = new User();
	    createdUser.setEmail(email);
	    createdUser.setPassword(passwordEncoder.encode(password)); // Encode the password
	    createdUser.setName(name);
	    createdUser.setMobile(mobile);
	    createdUser.setDateOfBirth(dateOfBirth);
	    createdUser.setLocation(location);
	    createdUser.setCaste(caste);
	    createdUser.setOccupation(occupation);
	    createdUser.setIncome(income);
	    createdUser.setPhoto(photo);
	    createdUser.setGender(gender);
	   
	    createdUser.setReligion(religion);
	    createdUser.setTransactionid(transactionid);
	    createdUser.setPaymentstatus(paymentstatus);
	    createdUser.setMaritialStatus(maritialStatus);

	    // Save the user in the database
	    User savedUser = userService.createUser(createdUser);

	    // Authenticate the user and set the security context
	    Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
	    SecurityContextHolder.getContext().setAuthentication(authentication);

	    // Generate JWT token
	    String token = jwtProvider.generateToken(authentication);

	    // Prepare the response
	    AuthResponse authResponse = new AuthResponse();
	    authResponse.setJwt(token);
	    authResponse.setMessage("Signup successful");

	    return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
	}
	@PostMapping("/create-session")
	public ResponseEntity<Map<String, String>> createPaymentSession(@RequestBody Map<String, Object> paymentDetails) {
	    try {
	        // Set up headers
	        HttpHeaders headers = new HttpHeaders();
	       // headers.setContentType(MediaType.APPLICATION_JSON);
	        headers.set("Content-Type", "application/json");
	        headers.set("x-client-id", APP_ID);
	        headers.set("x-client-secret", SECRET_KEY);
	        headers.set("x-api-version", "2022-09-01");

	        // Prepare request body
	        Map<String, Object> body = Map.of(
	            "customer_details", Map.of(
	                "customer_id", paymentDetails.get("customer_id"),
	                "customer_email", paymentDetails.get("customer_email"),
	                "customer_phone", paymentDetails.get("customer_phone")
	            ),
	            "order_id", UUID.randomUUID().toString(),
	            "order_amount", paymentDetails.get("amount"),
	            "email", paymentDetails.get("email"),
	            "order_currency", "INR"
	        );

	        // Send request
	        ResponseEntity<Map> response = new RestTemplate().postForEntity(API_URL, new HttpEntity<>(body, headers), Map.class);

	        // Return session ID if successful
	        return response.getStatusCode() == HttpStatus.OK
	            ? ResponseEntity.ok(Map.of("session_id", (String) response.getBody().get("payment_session_id")))
	            : ResponseEntity.status(response.getStatusCode()).body(Map.of("error", "Failed to generate session"));

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
	    }
	}



	@PostMapping("/signin")
	public ResponseEntity<AuthResponse>loginUserHandler(@RequestBody LoginRequest loginRequest){
		
		String username=loginRequest.getEmail();
		String password=loginRequest.getPassword();
		
		Authentication authentication=authenticate(username,password);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token=jwtProvider.generateToken(authentication);
		AuthResponse authResponse=new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Signin successs");
		return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.CREATED);
		
		
	}
	
	private Authentication authenticate(String username,String password) {
		UserDetails userDetails=userServiceImpl.loadUserByUsername(username);
		
		if(userDetails==null) {
			throw new BadCredentialsException("Invalid Username.......");
		}
		
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password.......");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
		
	}
	 @PostMapping("/verify-payment")
	    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> request) {
	        
	        String email = request.get("email");
	        String paymentId = request.get("transactionId");
	        
	        // Fetch user by email
	        User user = userRepository.findByEmail(email);
	        if (user == null) {
	            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	        }
	        
	      //   Verify transaction ID using Razorpay API
	        boolean isTransactionValid = verifyRazorpayTransaction(paymentId);
	        if (!isTransactionValid) {
	            return new ResponseEntity<>("Invalid transaction ID", HttpStatus.BAD_REQUEST);
	        }
//	        
	        // Update user payment details
	        user.setTransactionid(paymentId);
	        user.setPaymentstatus("Paid");
	        userRepository.save(user);
	        
	        return new ResponseEntity<>("Payment verification successful", HttpStatus.OK);
	    }
	    
//	 private boolean verifyRazorpayTransaction(String paymentId) {
//	        try {
//	            RazorpayClient razorpay = new RazorpayClient("rzp_test_mwMOJmd8rf53jB", "O6ngq4FisFGtuvakBhXkH53h");
//	            Payment payment = razorpay.payments.fetch(paymentId);
//	            
//	            return "captured".equalsIgnoreCase(payment.get("status"));
//	        } catch (RazorpayException e) {
//	            return false;
//	        }
//	    }
	
	 private boolean verifyRazorpayTransaction(String paymentId) {
		    try {
		        RazorpayClient razorpay = new RazorpayClient("rzp_test_mwMOJmd8rf53jB", "O6ngq4FisFGtuvakBhXkH53h");
		        Payment payment = razorpay.payments.fetch(paymentId);

		        System.out.println("Payment ID: " + paymentId);
		        System.out.println("Payment Status: " + payment.get("status"));
		        System.out.println("Payment Amount: " + payment.get("amount"));
		        System.out.println("Payment Currency: " + payment.get("currency"));
		        System.out.println("Payment Method: " + payment.get("method"));

		        // If payment is authorized, capture it
		        if ("authorized".equalsIgnoreCase((String) payment.get("status"))) {
		            JSONObject captureRequest = new JSONObject();

		            // Ensure amount is properly cast to avoid ambiguity
		            if (payment.get("amount") instanceof Number) {
		                captureRequest.put("amount", ((Number) payment.get("amount")).longValue()); // Convert to long
		            } else {
		                System.out.println("Invalid type for amount");
		                return false;
		            }

		            if (payment.get("currency") instanceof String) {
		                captureRequest.put("currency", (String) payment.get("currency"));
		            } else {
		                System.out.println("Invalid type for currency");
		                return false;
		            }

		            Payment capturedPayment = razorpay.payments.capture(paymentId, captureRequest);
		            System.out.println("Payment Captured: " + capturedPayment.get("status"));

		            return "captured".equalsIgnoreCase((String) capturedPayment.get("status"));
		        }

		        // If already captured, return true
		        return "captured".equalsIgnoreCase((String) payment.get("status"));
		    } catch (RazorpayException e) {
		        System.out.println("Error while verifying payment: " + e.getMessage());
		        return false;
		    }
		}


	
	@PostMapping("/logout")
	public ResponseEntity<AuthResponse> logoutUserHandler() {

	    // Invalidate the security context
	    SecurityContextHolder.clearContext();

	    // Prepare the response
	    AuthResponse authResponse = new AuthResponse();
	    authResponse.setMessage("Logout successful");

	    return new ResponseEntity<>(authResponse, HttpStatus.OK);
	}
	


	
	
	
	
	
	
	

	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/generate-user-report")
	public ResponseEntity<String> generateUserReport(@RequestBody Map<String, String> requestBody) {
	    String email = requestBody.get("email"); // Extract email from JSON body

	    if (email == null || email.isEmpty()) {
	        return new ResponseEntity<>("Email is required", HttpStatus.BAD_REQUEST);
	    }

	    // Simulated user retrieval (Replace with database query)
	    User user = userRepository.findByEmail(email);
	    if (user == null) {
	        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	    }

	    String fileName = "user_reports/" + user.getEmail() + "_report.pdf";

	    try {
	        String fileUrl = generateAndUploadPDF(fileName, user); // Generate & Upload PDF
	        sendWhatsAppMessage(user.getMobile(), fileUrl, user.getName()); // Send WhatsApp with attachment
	        sendEmailWithPdfLink(user.getEmail(), user.getName(), fileUrl);
	        return new ResponseEntity<>("PDF generated and sent via WhatsApp", HttpStatus.OK);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>("Error generating PDF: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	// 🔹 Step 1: Generate PDF & Upload to S3
	private String generateAndUploadPDF(String fileName, User user) throws Exception {
	    AmazonS3 s3Client = amazonS3(); // Get S3 client (configured in @Bean)
	    String bucketName = "userbiopdf"; // Replace with your S3 bucket name

	    ByteArrayOutputStream baos = new ByteArrayOutputStream();
	    Document document = new Document();
	    PdfWriter.getInstance(document, baos);
	    document.open();
	    document.add(new Paragraph("User Bio Data "));
	    document.add(new Paragraph("Name: " + user.getName()));
	  //  document.add(new Paragraph("Name: " + user.getName()));
	 //   document.add(new Paragraph("Email: " + user.getEmail()));
	 //   document.add(new Paragraph("Password: " + user.getPassword()));
	    document.add(new Paragraph("Mobile: " + user.getMobile()));
	  //  document.add(new Paragraph("Date of Birth: " + user.getDateOfBirth()));
	    document.add(new Paragraph("Location: " + user.getLocation()));
	    document.add(new Paragraph("Caste: " + user.getCaste()));
	    document.add(new Paragraph("Occupation: " + user.getOccupation()));
	    document.add(new Paragraph("Income: " + user.getIncome()));
	 //   document.add(new Paragraph("Photo: " + user.getPhoto()));
	    document.add(new Paragraph("Gender: " + user.getGender()));
	    document.add(new Paragraph("Marital Status: " + user.getMaritialStatus()));
	    document.add(new Paragraph("Religion: " + user.getReligion()));

	    
	    document.close();

	    byte[] pdfBytes = baos.toByteArray();
	    ByteArrayInputStream bais = new ByteArrayInputStream(pdfBytes);
	    
	    // Upload to S3
	    ObjectMetadata metadata = new ObjectMetadata();
	    metadata.setContentType("application/pdf");
	    metadata.setContentLength(pdfBytes.length);
	    s3Client.putObject(new PutObjectRequest(bucketName, fileName, bais, metadata).withCannedAcl(CannedAccessControlList.PublicRead));

	    // Return S3 file URL
	    return s3Client.getUrl(bucketName, fileName).toString();
	}

	// 🔹 Step 2: Send WhatsApp Message with PDF Attachment
//	private void sendWhatsAppMessage(String mobile, String pdfUrl, String name) {
//	    try {
//	        Twilio.init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
//	        String whatsappNumber = "whatsapp:+91" + mobile;
//
//	        Message message = Message.creator(
//	                new PhoneNumber(whatsappNumber),
//	                new PhoneNumber(TWILIO_WHATSAPP_NUMBER),
//	                "Welcome to Bandhan! 🎉\r\n"
//	                + "\r\n"
//	                + "Dear" + name + ",\r\n"
//	                
//	                + "Thank you for joining Bandhan! We have attached your profile details for verification. Please review them carefully, as they will be shared with potential matches.\r\n"
//	                + "\r\n"
//	                + "If any changes are needed, visit our website to update your details.\r\n"
//	                + "\r\n"
//	               
//	                + "Looking forward to helping you find your perfect match! 💕\r\n"
//	                + "\r\n"
//	                + "Best Regards,\r\n"
//	                + "Team Bandhan"
//	        )
//	        .setMediaUrl(Collections.singletonList(new URI(pdfUrl))) // Attach the PDF file
//	        .create();
//
//	        System.out.println("✅ WhatsApp message sent successfully: " + message.getSid());
//	    } catch (Exception e) {
//	        e.printStackTrace();
//	        System.out.println("❌ Failed to send WhatsApp message: " + e.getMessage());
//	    }
//	}

	private void sendEmailWithPdfLink(String toEmail, String userName, String pdfUrl) {
        try {
            // 🔹 Create Mail Sender Object
            JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
            mailSender.setHost("smtp.gmail.com");
            mailSender.setPort(587);
            mailSender.setUsername("aditya907583@gmail.com");
            mailSender.setPassword("wmyu hynu soyc gjhz");

            // 🔹 Mail Properties
            Properties props = mailSender.getJavaMailProperties();
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.starttls.required", "true");
            props.put("mail.debug", "true"); // Enable Debug Logs

            // 🔹 Create Mail Message
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Your User bio pdf is Ready!");

            // Email Body
            String emailBody = "Welcome to Bandhan! 🎉\r\n"
	                + "\r\n"
	                + "Dear" + userName +",\\r\\n"
	                + "\r\n"
	                + "Thank you for joining Bandhan! We have attached your profile details for verification. Please review them carefully, as they will be shared with potential matches.\r\n"
	                + "\r\n"
	                + "If any changes are needed, visit our website to update your details.\r\n"
	                + "\r\n"
	               
	                + "Looking forward to helping you find your perfect match! 💕\r\n"
	                + "\r\n"
	                + pdfUrl + "\n\n"
	                + "Best Regards,\r\n"
	                + "Team Bandhan";
                    
                    

            message.setText(emailBody);

            // 🔹 Send Email
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.out.println("❌ Error sending email: " + e.getMessage());
            e.printStackTrace();
        }
    }

//	@Bean
//	public AmazonS3 amazonS3() {
//	    return AmazonS3ClientBuilder.standard()
//	            .withRegion(Regions.AP_SOUTH_1) // Set your AWS region
//	            .withCredentials(new AWSStaticCredentialsProvider(
//	                    new BasicAWSCredentials("AKIA4T4OCN5HJJGNX7TQ", "amlOq1xWigOa3EH3ZCjZrmTsC8PNK7v2tykG5f3H")
//	            ))
//	            .build();
//	}
	
	
	
	
	
	// payment response
	
	
	
	@PostMapping("/process-payment")
   // public ResponseEntity<String> processPayment(@RequestParam String name, @RequestParam String email, @RequestParam double amount)
    public ResponseEntity<String> generateUserReport1(@RequestBody Map<String, String> requestBody){
		   String email = requestBody.get("email");
		
		    // Simulated user retrieval (Replace with database query)
		    User user = userRepository.findByEmail(email);
		//    String transactionid = user.getTransactionid();
		    double amount =100.0;
		    if (user == null || email.isEmpty()) {
		        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
		    }

		    String fileName1 = "user_payments/" + user.getEmail() + "_payment.pdf";

		    try {
		        String fileUrl1 = generateAndUploadPaymentPDFpay(fileName1, user, amount); // Generate & Upload PDF
		        sendWhatsAppMessagepay(user.getMobile(), fileUrl1); // Send WhatsApp with attachment
		        sendEmailWithPdfLinkpay(user.getEmail(), user.getName(), fileUrl1);
		        return new ResponseEntity<>("PDF generated and sent via WhatsApp", HttpStatus.OK);
		    } catch (Exception e) {
		        e.printStackTrace();
		        return new ResponseEntity<>("Error generating PDF: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		    }
    
	}
    // 🔹 Generate Payment Receipt PDF & Upload to AWS S3
    private String generateAndUploadPaymentPDFpay(String fileName1, User user, double amount) throws Exception {
        AmazonS3 s3Client = amazonS3();
        String bucketName = "userbiopdf";

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, baos);
        document.open();

        document.add(new Paragraph("Payment Receipt", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.BLACK)));
     //   document.add(new Paragraph(" "));
        document.add(new Paragraph("Name: " + user.getName()));
        document.add(new Paragraph("Email: " + user.getEmail()));
        document.add(new Paragraph("transactionId: " + user.getTransactionid()));
        document.add(new Paragraph("Amount Paid: ₹" + "100"));
        document.add(new Paragraph("Payment Status: PAID"));
        document.add(new Paragraph("Thank you for your payment!"));

        document.close();

        byte[] pdfBytes = baos.toByteArray();
        ByteArrayInputStream bais = new ByteArrayInputStream(pdfBytes);

        // Upload to S3
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("application/pdf");
        metadata.setContentLength(pdfBytes.length);
        s3Client.putObject(new PutObjectRequest(bucketName, fileName1, bais, metadata).withCannedAcl(CannedAccessControlList.PublicRead));
        

        return s3Client.getUrl(bucketName, fileName1).toString();
    }

    // 🔹 Send Email with Payment Receipt PDF Link
    private void sendEmailWithPdfLinkpay(String toEmail, String userName, String filUrl1) {
        try {
            JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
            mailSender.setHost("smtp.gmail.com");
            mailSender.setPort(587);
            mailSender.setUsername("aditya907583@gmail.com");
            mailSender.setPassword("wmyu hynu soyc gjhz");

            Properties props = mailSender.getJavaMailProperties();
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Payment Receipt - Confirmation");

            String emailBody1 = "Payment Confirmation - Bandhan 🎉\r\n"
	                + "\r\n"
	                + "Dear user,\r\n"
	                + "\r\n"
	                + "Thank you for your payment! Your transaction has been successfully processed.\r\n"
	                + "\r\n"
	                + "Please find the attached PDF for your payment details. If you have any questions, feel free to contact us.\r\n"
	                + "\r\n"
	                + "Thank you for choosing Bandhan! Wishing you the best in your journey. 💕\r\n"
	                + "\r\n"
	                + filUrl1 + "\n\n"
	                + "Best Regards,\r\n"
	                + "Team Bandhan";

            message.setText(emailBody1);
            mailSender.send(message);

            System.out.println("✅ Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.out.println("❌ Error sending email: " + e.getMessage());
        }
    
	}
    
//    private void sendWhatsAppMessagepay(String mobile, String fileUrl1) {
//	    try {
//	        Twilio.init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
//	        String whatsappNumber = "whatsapp:+91" + mobile;
//
//	        Message message = Message.creator(
//	                new PhoneNumber(whatsappNumber),
//	                new PhoneNumber(TWILIO_WHATSAPP_NUMBER),
//	                "Payment Confirmation - Bandhan 🎉\r\n"
//	                + "\r\n"
//	                + "Dear user,\r\n"
//	                + "\r\n"
//	                + "Thank you for your payment! Your transaction has been successfully processed.\r\n"
//	                + "\r\n"
//	                + "Please find the attached PDF for your payment details. If you have any questions, feel free to contact us.\r\n"
//	                + "\r\n"
//	                + "Thank you for choosing Bandhan! Wishing you the best in your journey. 💕\r\n"
//	                + "\r\n"
//	                + "Best Regards,\r\n"
//	                + "Team Bandhan"
//	        )
//	        .setMediaUrl(Collections.singletonList(new URI(fileUrl1))) // Attach the PDF file
//	        .create();
//
//	        System.out.println("✅ WhatsApp message sent successfully: " + message.getSid());
//	    } catch (Exception e) {
//	        e.printStackTrace();
//	        System.out.println("❌ Failed to send WhatsApp message: " + e.getMessage());
//	    }
//	}
    
//    @Bean
//	public AmazonS3 amazonS31() {
//	    return AmazonS3ClientBuilder.standard()
//	            .withRegion(Regions.AP_SOUTH_1) // Set your AWS region
//	            .withCredentials(new AWSStaticCredentialsProvider(
//	                    new BasicAWSCredentials("AKIA4T4OCN5HJJGNX7TQ", "amlOq1xWigOa3EH3ZCjZrmTsC8PNK7v2tykG5f3H")
//	            ))
//	            .build();
//	}

    
    
	
	
	
	

	
	
	
	
}
