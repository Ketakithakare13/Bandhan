using Microsoft.AspNetCore.Mvc;
using Bandhan.Services;
using Bandhan.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Bandhan.DTOs;

namespace BandhanApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserService userService, UserManager<ApplicationUser> userManager)
        {
            _userService = userService;
            _userManager = userManager;
        }

        /// <summary>
        /// Get all users (Admin only).
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            if (users == null || users.Count == 0)
                return NotFound(new { message = "No users found." });

            return Ok(users);
        }

        /// <summary>
        /// Get all male users.
        /// </summary>
        [Authorize]
        [HttpGet("males")]
        public async Task<IActionResult> GetAllMales()
        {
            var users = await _userService.GetAllMales();
            if (users == null || users.Count == 0)
                return NotFound(new { message = "No male users found." });

            return Ok(users);
        }

        /// <summary>
        /// Get all female users.
        /// </summary>
        [Authorize]
        [HttpGet("females")]
        public async Task<IActionResult> GetAllFemales()
        {
            var users = await _userService.GetAllFemales();
            if (users == null || users.Count == 0)
                return NotFound(new { message = "No female users found." });

            return Ok(users);
        }

        /// <summary>
        /// Get users within a specific age range.
        /// </summary>
        [Authorize]
        [HttpGet("age-range/{min}/{max}")]
        public async Task<IActionResult> GetUsersByAge(int min, int max)
        {
            if (min < 0 || max < 0 || min > max)
                return BadRequest(new { message = "Invalid age range provided." });

            var users = await _userService.GetUsersByAgeRange(min, max);
            if (users == null || users.Count == 0)
                return NotFound(new { message = "No users found in the given age range." });

            return Ok(users);
        }

        /// <summary>
        /// Get a user by their ID.
        /// </summary>
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id) // Ensure correct data type
        {
            if (id == Guid.Empty) // Validate ID
                return BadRequest(new { message = "User ID is required." });

            var user = await _userService.GetUserById(id.ToString()); // Convert Guid to string
            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(user);
        }


        /// <summary>
        /// Get users by salary range, excluding the current user.
        /// </summary>
        [Authorize]
        [HttpGet("salary-range/{min}/{max}/{currentUserId}")]
        public async Task<IActionResult> GetUsersBySalary(int min, int max, string currentUserId)
        {
            if (min < 0 || max < 0 || min > max)
                return BadRequest(new { message = "Invalid salary range provided." });

            if (string.IsNullOrEmpty(currentUserId))
                return BadRequest(new { message = "Current user ID is required." });

            var users = await _userService.GetUsersBySalary(min, max, currentUserId);
            if (users == null || users.Count == 0)
                return NotFound(new { message = "No users found within the given salary range." });

            return Ok(users);
        }

        /// <summary>
        /// Fetches profiles of the opposite gender for the logged-in user (Dashboard).
        /// </summary>
        
        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardProfiles()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User is not authenticated." });

            var user = await _userService.GetUserById(userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            List<ApplicationUser> profiles = (List<ApplicationUser>)((user.Gender == Gender.MALE.ToString())
                ? await _userService.GetAllFemales()
                : await _userService.GetAllMales());

            return Ok(profiles);
        }

        /// <summary>
        /// Updates the logged-in user's profile.
        /// </summary>
        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] ApplicationUser updatedUserDetails)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User is not authenticated." });

            var existingUser = await _userService.GetUserById(userId);
            if (existingUser == null)
                return NotFound(new { message = "User not found." });

            // Update allowed fields
            if (!string.IsNullOrEmpty(updatedUserDetails.Name)) existingUser.Name = updatedUserDetails.Name;
            if (!string.IsNullOrEmpty(updatedUserDetails.Mobile)) existingUser.Mobile = updatedUserDetails.Mobile;
            if (!string.IsNullOrEmpty(updatedUserDetails.Location)) existingUser.Location = updatedUserDetails.Location;
            if (!string.IsNullOrEmpty(updatedUserDetails.Caste)) existingUser.Caste = updatedUserDetails.Caste;
            if (!string.IsNullOrEmpty(updatedUserDetails.Occupation)) existingUser.Occupation = updatedUserDetails.Occupation;
            if (updatedUserDetails.Income > 0) existingUser.Income = updatedUserDetails.Income;
            if (!string.IsNullOrEmpty(updatedUserDetails.Photo)) existingUser.Photo = updatedUserDetails.Photo;
            if (!string.IsNullOrEmpty(updatedUserDetails.Gender)) existingUser.Gender = updatedUserDetails.Gender;
            if (!string.IsNullOrEmpty(updatedUserDetails.MaritialStatus)) existingUser.MaritialStatus = updatedUserDetails.MaritialStatus;
            if (!string.IsNullOrEmpty(updatedUserDetails.Religion)) existingUser.Religion = updatedUserDetails.Religion;

            var result = await _userManager.UpdateAsync(existingUser);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "User details updated successfully." });
        }

        /// <summary>
        /// Deletes the logged-in user's account.
        /// </summary>
        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User is not authenticated." });

            var user = await _userService.GetUserById(userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            await _userManager.DeleteAsync(user);

            return Ok(new { message = "User account deleted successfully." });
        }

        /// <summary>
        /// Get details of the logged-in user.
        /// </summary>
        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetUserDetails()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User is not authenticated." });

            var user = await _userService.GetUserById(userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(user);
        }

        [Authorize]
        [HttpPost("profiles/filter")]
        public async Task<IActionResult> FilterUsers([FromBody] FilterRequest filterRequest)
        {
            // Extract user identity from JWT token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User is not authenticated." });

            // Fetch the logged-in user
            var loggedInUser = await _userManager.FindByIdAsync(userId);
            if (loggedInUser == null)
                return NotFound(new { message = "User not found." });

            // Determine opposite gender
            Gender oppositeGender = loggedInUser.Gender == Gender.MALE.ToString() ? Gender.FEMALE : Gender.MALE;

            // Debugging logs
            Console.WriteLine($"Incoming Filter Request: {filterRequest}");
            Console.WriteLine($"Logged in User: {loggedInUser.Email}");
            Console.WriteLine($"Opposite Gender for Filtering: {oppositeGender}");

            // Call service method to filter users
            var filteredUsers = await _userService.FilterUsers(filterRequest, oppositeGender);

            return Ok(filteredUsers);
        }

    }
}
