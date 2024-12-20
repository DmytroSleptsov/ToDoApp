using Microsoft.EntityFrameworkCore;
using ToDoApp.Data.Models;
using ToDoApp.Data.Repositories.Interfaces;

namespace ToDoApp.Data.Repositories
{
    public class ProjectRepository : BaseRepository<Project>, IProjectRepository
    {
        public ProjectRepository(TasksDbContext tasksDbContext) : base(tasksDbContext) { }

        public async Task<List<Project>> GetProjectsByUser(int userId)
        {
            return await _dbContext.Set<Project>()
                .Where(project => project.UserId == userId)
                .ToListAsync();
        }
    }
}