using Microsoft.EntityFrameworkCore;
using ToDoApp.Data.Models;
using ToDoApp.Data.Repositories.Interfaces;

namespace ToDoApp.Data.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(TasksDbContext tasksDbContext) : base(tasksDbContext) { }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _dbContext.Set<User>()
                .FirstOrDefaultAsync(user => user.Email == email);
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _dbContext.Set<User>()
                .AnyAsync(user => user.Email == email);
        }
    }
}