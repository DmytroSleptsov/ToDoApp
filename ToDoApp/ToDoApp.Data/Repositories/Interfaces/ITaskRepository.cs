using ToDoTask = ToDoApp.Data.Models.Task;

namespace ToDoApp.Data.Repositories.Interfaces
{
    public interface ITaskRepository : IBaseRepository<Data.Models.Task> 
    {
        Task<List<ToDoTask>> GetTasksByUser(int userId);
    }
}