using ToDoTask = ToDoApp.Data.Models.Task;

namespace ToDoApp.Core.Services.Interfaces
{
    public interface ITaskService
    {
        Task<List<ToDoTask>> GetUserAllTasks(int userId);
        Task<ToDoTask> GetTaskById(int id);
        Task CreateTask(ToDoTask task);
        Task UpdateTask(ToDoTask task);
        Task DeleteTask(int id);
    }
}
