using ToDoApp.Core.Services.Interfaces;
using ToDoApp.Data.UnitOfWork;

namespace ToDoApp.Core.Services
{
    public class TaskService : ITaskService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TaskService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task CreateTask(Data.Models.Task task)
        {
            _unitOfWork.Tasks.Add(task);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteTask(int id)
        {
            await _unitOfWork.Tasks.Delete(id);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<List<Data.Models.Task>> GetUserAllTasks(int userId)
        {
            return await _unitOfWork.Tasks.GetTasksByUser(userId);
        }

        public async Task<List<Data.Models.Task>> GetProjectAllTasks(int projectId)
        {
            return await _unitOfWork.Tasks.GetTasksByProject(projectId);
        }

        public async Task<Data.Models.Task> GetTaskById(int id)
        {
            return await _unitOfWork.Tasks.GetById(id);
        }

        public async Task UpdateTask(Data.Models.Task task)
        {
            _unitOfWork.Tasks.Update(task);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}