using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Bandhan.Models;  // Make sure this is the correct namespace for your models
using Microsoft.EntityFrameworkCore;
using Bandhan.Services;
using Microsoft.AspNetCore.Authorization;

namespace Bandhan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        // Inject IConfiguration, UserManager, and SignInManager into the constructor
        public AdminController(UserService userService,IConfiguration configuration, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
        }

       

        // Admin Login API (using hardcoded JWT secret key)
        [HttpPost("admin-login")]
        public async Task<IActionResult> AdminLogin([FromBody] LoginModel model)
        {
            // Hardcoded JWT Secret Key for Admin
            var secretKey = "hswjbhksjaxbhjkldkokijewgshqazjklnmm";  // Replace with your desired hardcoded secret key

            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("JWT SecretKey is not configured.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Find the user by email (replace with actual admin email validation)
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            // Check the password
            var passwordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
            {
                return Unauthorized("Invalid email or password.");
            }

            // If the user is found and the password is correct, generate a JWT token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, model.Email) }),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                Token = tokenHandler.WriteToken(token)  // Return the JWT token
            });
        }

        // Get All Users API (uses the configured JWT secret key)
        [HttpGet("get-all-users")]
        public async Task<IActionResult> GetAllUsers()
        {
            // Get all users from the database using UserManager
            var users = await _userManager.Users.ToListAsync();

            // Exclude admin by checking the email (assuming you know the admin's email)
            var adminEmail = "admin@gmail.com";  // Replace with your actual admin's email

            var filteredUsers = users.Where(u => u.Email != adminEmail).ToList();

            return Ok(filteredUsers);
        }

        [HttpGet("get-user/{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            if (_userService == null)
            {
                return StatusCode(500, new { message = "User service not available" });
            }

            var user = await _userService.GetUserById(id.ToString());
            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(user);
        }


    }
}
