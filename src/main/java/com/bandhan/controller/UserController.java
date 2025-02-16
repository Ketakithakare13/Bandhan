package com.bandhan.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bandhan.entity.Gender;
import com.bandhan.entity.MaritialStatus;
import com.bandhan.entity.Religion;
import com.bandhan.entity.User;
import com.bandhan.exception.UserException;
import com.bandhan.repository.UserRepository;
import com.bandhan.request.FilterRequest;
import com.bandhan.response.UserResponse;
import com.bandhan.service.UserService;

@RestController
@RequestMapping("user")
public class UserController {
	@Autowired
	private UserService userService;
	
	
	
	
	
	@Autowired
	private UserRepository userRepository;
	@GetMapping("/males")
	public List<User> getAllMales()
	{
		return userService.getAllMales();
		
	}
	
	@GetMapping("/females")
	public List<User> getAllFemales()
	{
		return userService.getAllFemales();
		
	}
	

@GetMapping("/dashboard") // Make sure this endpoint exists
	    public List<User> getDashboardProfiles() {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        
	        if (authentication == null || !authentication.isAuthenticated()) {
	            throw new RuntimeException("User is not authenticated");
	        }

	        String username = authentication.getName();
	        System.out.println("Logged-in user: " + username);

	        User user = userRepository.findByEmail(username);
	        if (user == null) {
	            throw new RuntimeException("User not found");
	        }

	        List<User> profiles = (user.getGender() == Gender.MALE) ? userService.getAllFemales() : userService.getAllMales();
	        System.out.println("Returning " + profiles.size() + " profiles");

	        return profiles;
	    }

	
	//for update user profile
		@PutMapping("/update")
		public ResponseEntity<UserResponse> updateUserHandler(@RequestBody User updatedUserDetails) throws UserException {

		    // Get the currently authenticated user
		    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		    String loggedInEmail = authentication.getName();

		    // Fetch the existing user from the database
		    User existingUser = userRepository.findByEmail(loggedInEmail);
		    if (existingUser == null) {
		        throw new UserException("User not found for the logged-in email: " + loggedInEmail);
		    }

		    // Update only the allowed fields
		    if (updatedUserDetails.getName() != null) {
		        existingUser.setName(updatedUserDetails.getName());
		    }
		    if (updatedUserDetails.getMobile() != null) {
		        existingUser.setMobile(updatedUserDetails.getMobile());
		    }
		    if (updatedUserDetails.getDateOfBirth() != null) {
		        existingUser.setDateOfBirth(updatedUserDetails.getDateOfBirth());
		    }
		    if (updatedUserDetails.getLocation() != null) {
		        existingUser.setLocation(updatedUserDetails.getLocation());
		    }
		    if (updatedUserDetails.getCaste() != null) {
		        existingUser.setCaste(updatedUserDetails.getCaste());
		    }
		    if (updatedUserDetails.getOccupation() != null) {
		        existingUser.setOccupation(updatedUserDetails.getOccupation());
		    }
		    if (updatedUserDetails.getIncome() != null) {
		        existingUser.setIncome(updatedUserDetails.getIncome());
		    }
		    if (updatedUserDetails.getPhoto() != null) {
		        existingUser.setPhoto(updatedUserDetails.getPhoto());
		    }
		    if (updatedUserDetails.getGender() != null) {
		        existingUser.setGender(updatedUserDetails.getGender());
		    }
//		    if (updatedUserDetails.getMaritialStatus() != null) {
//		        existingUser.setMaritialStatus(updatedUserDetails.getMaritialStatus());
//		    }
		    if (updatedUserDetails.getReligion() != null) {
		        existingUser.setReligion(updatedUserDetails.getReligion());
		    }

		    // Save the updated user back to the database
		    User savedUser = userRepository.save(existingUser);

		    // Prepare the response
		    
		    UserResponse userResponse=new UserResponse();
		    userResponse.setMessage("User details updated successfully");
		    return new ResponseEntity<>(userResponse, HttpStatus.OK);
		}
	
		
		// For deleting a user profile
		@DeleteMapping("/delete")
		public ResponseEntity<UserResponse> deleteUserHandler() throws UserException {

		    // Get the currently authenticated user
		    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		    String loggedInEmail = authentication.getName();

		    // Fetch the existing user from the database
		    User existingUser = userRepository.findByEmail(loggedInEmail);
		    if (existingUser == null) {
		        throw new UserException("User not found for the logged-in email: " + loggedInEmail);
		    }

		    // Delete the user from the database
		    userRepository.delete(existingUser);

		    // Prepare the response
		    UserResponse userResponse = new UserResponse();
		    userResponse.setMessage("User account deleted successfully");

		    return new ResponseEntity<>(userResponse, HttpStatus.OK);
		}
		
		
		 
		
		
		// Get logged-in user details
	    @GetMapping("/me")
	    public ResponseEntity<?> getUserDetails() throws UserException {
	        // Get the currently authenticated user
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String loggedInEmail = authentication.getName();  // Get email from authentication object

	        // Fetch the existing user from the database using email
	        User existingUser = userRepository.findByEmail(loggedInEmail);

	        // Check if user exists, if not throw an exception
	        if (existingUser == null) {
	            throw new UserException("User not found for the logged-in email: " + loggedInEmail);
	        }

	        // Return only the user's name in the response
	        //String userName = existingUser.getName();  // Assuming 'getName()' method exists in your User class
	        return ResponseEntity.ok(existingUser);  // Return the user's name
	    }

		

	    
		//Search user
		  @GetMapping("/search")
		    public ResponseEntity<List<User>> searchUsers(@RequestParam(required = false) String income,
		                                                  
		                                                  @RequestParam(required = false) MaritialStatus maritialStatus,
		                                                  @RequestParam(required = false) Religion religion,
		                                                  @RequestParam(required = false) String location) {
		        List<User> users = userService.searchUsers(income, maritialStatus, religion, location);
		        return ResponseEntity.ok(users);
		    }

		  @PostMapping("/profiles/filter")
		    public List<User> filterUsers(@RequestBody FilterRequest filterRequest, 
		                                  @RequestHeader("Authorization") String token) {
		        
		        // Extract user gender from JWT token
		    	  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			        String username = authentication.getName(); // Get username (email)
			        

			       

			        User loggedInUser =  userRepository.findByEmail(username);		                                    

		        Gender oppositeGender = (loggedInUser.getGender() == Gender.MALE) ? Gender.FEMALE : Gender.MALE;
		        //  Debugging logs in Controller
		        System.out.println(" Incoming Filter Request: " + filterRequest);
		        System.out.println(" Logged in User: " + username);
		        System.out.println(" Opposite Gender for Filtering: " + oppositeGender);

		        // Call service method with request parameters and opposite gender
		        return userService.filterUsers(filterRequest, oppositeGender);
		    }
	
		//user data on the basis of id
		    @GetMapping("/{id}")
		    public Optional<User> getUserById(@PathVariable Long id) {
		        return userRepository.findById(id);
		    }

		    @GetMapping("/gender")
		    public String getUserGender() {
		        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		        String username = authentication.getName(); // Get username (email)
		        User user =  userRepository.findByEmail(username);
		        return user.getGender().name(); // Return gender as a string (MALE/FEMALE)
		    }
	
}
