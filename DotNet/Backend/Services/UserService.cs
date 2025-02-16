using Bandhan.Repositories;
using Bandhan.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bandhan.Data;
using Bandhan.DTOs;

namespace Bandhan.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        /// <summary>
        /// Get users within a specific age range.
        /// </summary>
        public async Task<IList<ApplicationUser>> GetUsersByAgeRange(int min, int max)
        {
            return await _userRepository.GetAgeUserAsync(min, max);
        }

        /// <summary>
        /// Get all users.
        /// </summary>
        public async Task<IList<ApplicationUser>> GetAllUsers()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        /// <summary>
        /// Get all male users.
        /// </summary>
        public async Task<IList<ApplicationUser>> GetAllMales()
        {
            return await _userRepository.GetAllMalesAsync();
        }

        /// <summary>
        /// Get all female users.
        /// </summary>
        public async Task<IList<ApplicationUser>> GetAllFemales()
        {
            return await _userRepository.GetAllFemalesAsync();
        }

        /// <summary>
        /// Get a user by their ID.
        /// </summary>
        public async Task<ApplicationUser> GetUserById(string userId)
        {
            return await _userRepository.GetByIdAsync(userId);
        }

        /// <summary>
        /// Get users by salary range, excluding the current user.
        /// </summary>
        public async Task<IList<ApplicationUser>> GetUsersBySalary(int minSalary, int maxSalary, string currentUserId)
        {
            return await _userRepository.UserBySalaryAsync(minSalary, maxSalary, currentUserId);
        }

        public async Task<List<ApplicationUser>> FilterUsers(FilterRequest filterRequest, Gender oppositeGender)
        {
            return await _userRepository.FilterUsers(
                filterRequest.Religion,
                filterRequest.Location,
                filterRequest.Occupation,
                oppositeGender
            );
        }


        public async Task<ApplicationUser> UpdateUserAsync(string loggedInEmail, ApplicationUser updatedUserDetails)
        {
            var existingUser = await _userRepository.FindByEmailAsync(loggedInEmail);
            if (existingUser == null)
            {
                throw new Exception("User not found.");
            }

            existingUser.Name = updatedUserDetails.Name ?? existingUser.Name;
            existingUser.Income = updatedUserDetails.Income != 0 ? updatedUserDetails.Income : existingUser.Income;
            existingUser.DateOfBirth = updatedUserDetails.DateOfBirth != default(DateTime) ? updatedUserDetails.DateOfBirth : existingUser.DateOfBirth;
            existingUser.Location = updatedUserDetails.Location ?? existingUser.Location;
            existingUser.Caste = updatedUserDetails.Caste ?? existingUser.Caste;
            existingUser.Religion = !string.IsNullOrEmpty(updatedUserDetails.Religion) ? updatedUserDetails.Religion : existingUser.Religion;
            existingUser.MaritialStatus = !string.IsNullOrEmpty(updatedUserDetails.MaritialStatus) ? updatedUserDetails.MaritialStatus : existingUser.MaritialStatus;
            existingUser.Photo = updatedUserDetails.Photo ?? existingUser.Photo;
            existingUser.Gender = !string.IsNullOrEmpty(updatedUserDetails.Gender) ? updatedUserDetails.Gender : existingUser.Gender;
            
            return await _userRepository.UpdateUserAsync(existingUser);


        }
    }
}
