using ToDoApp.Core.Services.Interfaces;
using ToDoApp.Data.Repositories.Interfaces;

namespace ToDoApp.Core.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task CreateTask(Data.Models.Task task)
        {
            await _taskRepository.Add(task);
        }

        public async Task DeleteTask(int id)
        {
            await _taskRepository.Delete(id);
        }

        public async Task<List<Data.Models.Task>> GetUserAllTasks(int userId)
        {
            return await _taskRepository.GetTasksByUser(userId);
        }

        public async Task<Data.Models.Task> GetTaskById(int id)
        {
            return await _taskRepository.GetById(id);
        }

        public async Task UpdateTask(Data.Models.Task task)
        {
            await _taskRepository.Update(task);
        }
    }
}