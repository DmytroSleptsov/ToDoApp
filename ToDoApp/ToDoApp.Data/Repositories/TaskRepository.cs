using Microsoft.EntityFrameworkCore;
using ToDoApp.Data.Repositories.Interfaces;
using ToDoTask = ToDoApp.Data.Models.Task;

namespace ToDoApp.Data.Repositories
{
    public class TaskRepository : BaseRepository<Data.Models.Task>, ITaskRepository
    {
        public TaskRepository(TasksDbContext tasksDbContext) : base(tasksDbContext) { }

        public async Task<List<ToDoTask>> GetTasksByUser(int userId)
        {
            return await _dbContext.Set<ToDoTask>()
                .Where(task => task.UserId == userId)
                .ToListAsync();
        }
    }
}