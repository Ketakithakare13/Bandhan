//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using Bandhan.Data;
//using Bandhan.Models;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;

//namespace Bandhan.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]

//    //baseUrl/api/UserAuth
//    public class UserAuthController : ControllerBase
//    {
//        private readonly UserManager<ApplicationUser> _userManager;
//        private readonly SignInManager<ApplicationUser> _signInManager;
//        private readonly string? _jwtKey;
//        private readonly string? _JwtIssuer;
//        private readonly string? _jwtAudience;
//        private readonly int _JwtExpiry;

//        public UserAuthController(UserManager<ApplicationUser> userManager, 
//            SignInManager<ApplicationUser> signInManager,
//            IConfiguration configuration)
//        {
//            _userManager = userManager;
//            _signInManager = signInManager;
//            _jwtKey = configuration["Jwt:Key"];
//            _JwtIssuer = configuration["Jwt:Issuer"];
//            _jwtAudience = configuration["Jwt:Audience"];
//            _JwtExpiry = int.Parse(configuration["Jwt:ExpiryMinutes"]);
//        }

//        //baseUrl/api/UserAuth/Register
//        [HttpPost("Register")]

//        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
//        {
//           if(registerModel == null
//                || string.IsNullOrEmpty(registerModel.Name)
//                || string.IsNullOrEmpty(registerModel.Email)
//                || string.IsNullOrEmpty(registerModel.Password)
//                )
//            {
//                return BadRequest("Invalid Registration Details");
//            }

//           var existingUser = await _userManager.FindByEmailAsync(registerModel.Email);
//            if (existingUser != null)
//            {
//                return Conflict("Eemail Already Exist");
//            }
//            var user = new ApplicationUser
//            {
//                Name = registerModel.Name,
//                Email = registerModel.Email,
//                UserName = registerModel.Email
//            };
//            var result = await _userManager.CreateAsync(user, registerModel.Password);
//            if (!result.Succeeded)
//            {
//                return BadRequest(result.Errors);
//            }
//            else
//            {
//                return Ok("User Created Successfully");
//            }
//        }

//        [HttpPost("Login")]
//        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
//        {
//            var user = await _userManager.FindByEmailAsync(loginModel.Email);

//            if (user == null)
//            {
//                return Unauthorized(new { success = false, message = "Invalid Username or Pssword" });
//            }

//           var result = await _signInManager.CheckPasswordSignInAsync(user, loginModel.Password,false);

//            if(!result.Succeeded)
//            {
//                return Unauthorized(new { success = false, message = "Invalid Username or Pssword" });
//            }

//            var token = GenerateJWTToken(user);

//            return Ok(new { success = true, token = token });
//        }

//        [HttpPost("Logout")]
//        public async Task<IActionResult> Logout()
//        {
//            await _signInManager.SignOutAsync();
//            return Ok("User Logged Out Successfully");
//        }
//        private string GenerateJWTToken(ApplicationUser user)
//        {
//            var Claims = new[]
//            {
//                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
//                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
//                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                new Claim("Name", user.Name),
//            };

//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtKey));

//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//            var token = new JwtSecurityToken(
//                claims: Claims,
//                expires: DateTime.Now.AddMinutes(_JwtExpiry),
//                signingCredentials: creds
//                );

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }
//    }
//}

//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;
//using Bandhan.Models;
//using Microsoft.Extensions.Configuration;
//using System;
//using System.Collections.Generic;
//using Bandhan.Data;
//using Microsoft.AspNetCore.Authorization;

//namespace Bandhan.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserAuthController : ControllerBase
//    {
//        private readonly UserManager<ApplicationUser> _userManager;
//        private readonly SignInManager<ApplicationUser> _signInManager;
//        private readonly IConfiguration _configuration;

//        public UserAuthController(UserManager<ApplicationUser> userManager,
//                                  SignInManager<ApplicationUser> signInManager,
//                                  IConfiguration configuration)
//        {
//            _userManager = userManager;
//            _signInManager = signInManager;
//            _configuration = configuration;
//        }

//        /// <summary>
//        /// Registers a new user with provided details.
//        /// </summary>
//        [HttpPost("register")]
//        public async Task<IActionResult> Register([FromBody] RegisterModel model)
//        {
//            if (model == null)
//                return BadRequest(new { message = "Invalid registration details." });

//            var existingUser = await _userManager.FindByEmailAsync(model.Email);
//            if (existingUser != null)
//                return Conflict(new { message = "Email already exists." });

//            // Calculate Age
//            int age = DateTime.Today.Year - model.BirthDate.Year;
//            if (model.BirthDate > DateTime.Today.AddYears(-age))
//                age--;

//            var user = new ApplicationUser
//            {

//                Email = model.Email,
//                Name = model.Name,
//                City = model.City,
//                BirthDate = model.BirthDate,
//                Age = age,
//                Caste = model.Caste,
//                Gender = model.Gender,
//                Occupation = model.Occupation,
//                Salary = model.Salary,
//                MaritialStatus = model.MaritialStatus,
//                Religion = model.Religion
//            };

//            var result = await _userManager.CreateAsync(user, model.Password);

//            if (!result.Succeeded)
//                return BadRequest(result.Errors);

//            return Ok(new { message = "User registered successfully." });
//        }

//        /// <summary>
//        /// Logs in a user and returns a JWT token.
//        /// </summary>
//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] LoginModel model)
//        {
//            if (model == null)
//                return BadRequest(new { message = "Invalid login request." });

//            var user = await _userManager.FindByEmailAsync(model.Email);
//            if (user == null)
//                return Unauthorized(new { success = false, message = "Invalid email or password." });

//            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
//            if (!result.Succeeded)
//                return Unauthorized(new { success = false, message = "Invalid email or password." });

//            var token = await GenerateJwtToken(user);
//            return Ok(new { success = true, token });
//        }

//        /// <summary>
//        /// Generates a JWT token for the authenticated user.
//        /// </summary>
//        private async Task<string> GenerateJwtToken(ApplicationUser user)
//        {
//            var roles = await _userManager.GetRolesAsync(user);

//            var claims = new List<Claim>
//            {
//                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
//                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? "N/A"),
//                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                new Claim("Name", user.Name ?? "N/A"),
//                new Claim("City", user.City ?? "N/A"),
//                new Claim("Gender", user.Gender.ToString()), // Enum to string
//                new Claim("MaritialStatus", user.MaritialStatus.ToString()),
//                new Claim("Religion", user.Religion.ToString())
//            };

//            // Add user roles as claims
//            foreach (var role in roles)
//            {
//                claims.Add(new Claim(ClaimTypes.Role, role));
//            }

//            var key = _configuration["Jwt:Key"];
//            if (string.IsNullOrEmpty(key))
//                throw new InvalidOperationException("JWT Key is missing from configuration.");

//            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
//            var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

//            var token = new JwtSecurityToken(
//                issuer: _configuration["Jwt:Issuer"],
//                audience: _configuration["Jwt:Audience"],
//                claims: claims,
//                expires: DateTime.UtcNow.AddMinutes(int.Parse(_configuration["Jwt:ExpiryMinutes"] ?? "60")),
//                signingCredentials: creds
//            );

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }

//        [Authorize] // Requires a valid JWT token
//        [HttpPost("logout")]
//        public async Task<IActionResult> Logout()
//        {
//            await _signInManager.SignOutAsync(); // Not necessary for JWT but keeps Identity consistency

//            return Ok(new { message = "User logged out successfully. Please remove the token on the client-side." });
//        }
//    }
//}


using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Bandhan.DTOs;
using Bandhan.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Bandhan.Repositories;

namespace Bandhan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUserRepository _userRepository;

        

        public UserAuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IUserRepository userRepository,
            IConfiguration configuration,
            IWebHostEnvironment webHostEnvironment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        /// <summary>
        /// Register a new user (Auto-Assigns "User" role if not provided).
        /// </summary>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            Console.WriteLine("\n🔍 Received Register Request...");
            Console.WriteLine($"🔹 Content-Type: {Request.ContentType}");
            Console.WriteLine($"🔹 Request Method: {Request.Method}");

            foreach (var header in Request.Headers)
            {
                Console.WriteLine($"🔹 {header.Key}: {header.Value}");
            }

            if (model == null)
            {
                Console.WriteLine("❌ Model is NULL!");
                return BadRequest(new { message = "Invalid registration details." });
            }

            // ✅ Check if Email already exists
            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                return Conflict(new { message = "Email already exists." });
            }

            // ✅ Default Role Assignment
            model.Role ??= "User";

            // ✅ Validate Birthdate & Calculate Age
            if (model.DateOfBirth > DateTime.Today)
            {
                return BadRequest(new { message = "Invalid birthdate." });
            }

            int age = DateTime.Today.Year - model.DateOfBirth.Year;
            if (model.DateOfBirth.Date > DateTime.Today.AddYears(-age)) age--; // Adjust for upcoming birthday

            // ✅ Store only the filename (image path as a string)
            string imagePath = model.Photo ?? "default-profile.jpg";

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name,
                Location= model.Location,
                DateOfBirth = model.DateOfBirth,
                Age = age, // ✅ Fixed Age Calculation
                Caste = model.Caste,
                Mobile = model.Mobile,
                Gender = model.Gender,
                Occupation = model.Occupation,
                Income = model.Income,
                MaritialStatus = model.MaritialStatus,
                Religion = model.Religion,
                Photo = imagePath, // ✅ Storing Image Filename
                TransactionId = model.TransactionId,
                PaymentStatus = model.PaymentStatus

            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // ✅ Ensure Role Exists Before Assigning
            if (!await _roleManager.RoleExistsAsync(model.Role))
            {
                await _roleManager.CreateAsync(new IdentityRole(model.Role));
            }

            // ✅ Assign Role to User
            await _userManager.AddToRoleAsync(user, model.Role);

            return Ok(new { message = $"User registered successfully as {model.Role}." });
        }


        /// <summary>
        /// Log in a user and return a JWT token.
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (model == null)
                return BadRequest(new { message = "Invalid login request." });

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return Unauthorized(new { success = false, message = "Invalid email or password." });

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
                return Unauthorized(new { success = false, message = "Invalid email or password." });

            // Generate JWT token
            var token = await GenerateJwtToken(user);
            return Ok(new { success = true, token });
        }

        /// <summary>
        /// Generates a JWT token for the authenticated user.
        /// </summary>
        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? "N/A"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Name", user.Name ?? "N/A"),
                new Claim("Location", user.Location ?? "N/A"),
                new Claim("Gender", user.Gender.ToString()), // Enum to string
                new Claim("MaritialStatus", user.MaritialStatus.ToString()),
                new Claim("Religion", user.Religion.ToString())
            };

            // Add user roles as claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(key))
                throw new InvalidOperationException("JWT Key is missing from configuration.");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(_configuration["Jwt:ExpiryMinutes"] ?? "60")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>
        /// Log out a user (JWT should be removed on client side).
        /// </summary>
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync(); // Not necessary for JWT but keeps Identity consistency
            return Ok(new { message = "User logged out successfully. Please remove the token on the client-side." });
        }
        [HttpPost("verify-payment")]
        public async Task<IActionResult> VerifyPayment([FromBody] Dictionary<string, string> request)
        {
            try
            {
                // Check if _userRepository is null (Debugging)
                if (_userRepository == null)
                {
                    return StatusCode(500, "UserRepository is not initialized.");
                }

                // Extract request data
                if (!request.ContainsKey("email") || !request.ContainsKey("transactionId"))
                {
                    return BadRequest("Missing email or transaction ID.");
                }

                string email = request["email"];
                string paymentId = request["transactionId"];

                // Fetch user by email
                var user = await _userRepository.FindByEmailAsync(email);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                // Razorpay API Credentials
                string keyId = "rzp_test_mwMOJmd8rf53jB";
                string keySecret = "O6ngq4FisFGtuvakBhXkH53h";

                // Create authentication header
                var authToken = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{keyId}:{keySecret}"));
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);
                    var response = await client.GetAsync($"https://api.razorpay.com/v1/payments/{paymentId}");

                    if (!response.IsSuccessStatusCode)
                    {
                        return BadRequest("Invalid transaction ID.");
                    }

                    // Parse Razorpay response
                    var responseBody = await response.Content.ReadAsStringAsync();
                    var paymentData = JsonConvert.DeserializeObject<JObject>(responseBody);

                    string paymentStatus = paymentData["status"]?.ToString();
                    if (paymentStatus != "captured")
                    {
                        return BadRequest("Payment not captured.");
                    }

                    // Update user payment details
                    user.TransactionId = paymentId;
                    user.PaymentStatus = "Paid";

                    await _userRepository.SaveAsync();

                    return Ok("Payment verification successful.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }







    }


}

