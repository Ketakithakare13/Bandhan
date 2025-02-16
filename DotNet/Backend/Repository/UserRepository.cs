using Bandhan.Data;
using Bandhan.Models;
using Bandhan.Repositories;
using Bandhan.Data;
using Bandhan.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bandhan.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get users within a specific age range.
        /// </summary>
        public async Task<IList<ApplicationUser>> GetAgeUserAsync(int min, int max)
        {
            return await _context.Users
                .Where(x => x.Age >= min && x.Age <= max)
                .AsNoTracking()
                .ToListAsync();
        }

        /// <summary>
        /// Get all users.
        /// </summary>
        public async Task<IList<ApplicationUser>> GetAllUsersAsync()
        {
            return await _context.Users
                .AsNoTracking()
                .ToListAsync();
        }

        /// <summary>
        /// Get all female users.
        /// </summary>
        public async Task<IList<ApplicationUser>> GetAllFemalesAsync()
        {
            return await _context.Users
                .Where(x => x.Gender == Gender.FEMALE.ToString())
                .AsNoTracking()
                .ToListAsync();
        }

        /// <summary>
        /// Get all male users.
        /// </summary>
        public async Task<IList<ApplicationUser>> GetAllMalesAsync()
        {
            return await _context.Users
                .Where(x => x.Gender == Gender.MALE.ToString())
                .AsNoTracking()
                .ToListAsync();
        }

        /// <summary>
        /// Get a user by ID.
        /// </summary>
        public async Task<ApplicationUser> GetByIdAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
                return null;

            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == userId);
        }

        /// <summary>
        /// Get users within a salary range, excluding the current user.
        /// </summary>
        public async Task<IList<ApplicationUser>> UserBySalaryAsync(int minSalary, int maxSalary, string currentUserId)
        {
            if (string.IsNullOrEmpty(currentUserId))
                return new List<ApplicationUser>();

            var currentUser = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == currentUserId);

            if (currentUser == null)
                return new List<ApplicationUser>();

            return await _context.Users
                .Where(x => x.Income > minSalary && x.Income <= maxSalary
                            && x.Gender != currentUser.Gender
                            && x.Id != currentUserId)
                .AsNoTracking()
                .ToListAsync();
        }

       

        public async Task<ApplicationUser> FindByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<IList<ApplicationUser>> FindByFiltersAsync(Religion? religion, string location, string occupation, Gender gender)
        {
            return await _context.Users
                .Where(u =>
                    (religion == null || u.Religion == religion.ToString()) &&
                    (string.IsNullOrEmpty(location) || u.Location == location) &&
                    (string.IsNullOrEmpty(occupation) || u.Occupation == occupation) &&
                    u.Gender == gender.ToString())
                .ToListAsync();
        }

        public async Task<ApplicationUser> UpdateUserAsync(ApplicationUser user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUserAsync(ApplicationUser user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ApplicationUser>> FilterUsers(string religion, string location, string occupation, Gender gender)
        {
            return await _context.Users
                .Where(u =>
                    (string.IsNullOrEmpty(religion) || u.Religion == religion) &&
                    (string.IsNullOrEmpty(location) || u.Location == location) &&
                    (string.IsNullOrEmpty(occupation) || u.Occupation == occupation) &&
                    u.Gender == gender.ToString())
                .ToListAsync();
        }
        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }


    }
     
    }
