using ToDoTask = ToDoApp.Data.Models.Task;

namespace ToDoApp.Data.Repositories.Interfaces
{
    public interface ITaskRepository : IBaseRepository<ToDoTask> 
    {
        Task<List<ToDoTask>> GetTasksByUser(int userId);
        Task<List<ToDoTask>> GetTasksByProject(int projectId);
    }
}