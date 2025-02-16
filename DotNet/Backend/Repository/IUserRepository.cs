using Bandhan.Data;
using Bandhan.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bandhan.Repositories
{
    public interface IUserRepository
    {
        Task<IList<ApplicationUser>> GetAgeUserAsync(int min, int max);
        Task<IList<ApplicationUser>> GetAllUsersAsync();
        Task<IList<ApplicationUser>> GetAllFemalesAsync();
        Task<IList<ApplicationUser>> GetAllMalesAsync();
        Task<ApplicationUser> GetByIdAsync(string userId);
        Task<IList<ApplicationUser>> UserBySalaryAsync(int minSalary, int maxSalary, string currentUserId);

        Task<ApplicationUser> FindByEmailAsync(string email);
        Task<IList<ApplicationUser>> FindByFiltersAsync(Religion? religion, string location, string occupation, Gender gender);
        Task<ApplicationUser> UpdateUserAsync(ApplicationUser user);
        Task DeleteUserAsync(ApplicationUser user);
        Task<List<ApplicationUser>> FilterUsers(string religion, string location, string occupation, Gender oppositeGender);

        Task<int> SaveAsync();
    }
}
