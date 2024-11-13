using ToDoApp.Data.Repositories.Interfaces;

namespace ToDoApp.Data.Repositories
{
    public class TaskRepository : BaseRepository<Data.Models.Task>, ITaskRepository
    {
        public TaskRepository(TasksDbContext tasksDbContext) : base(tasksDbContext) { }
    }
}
