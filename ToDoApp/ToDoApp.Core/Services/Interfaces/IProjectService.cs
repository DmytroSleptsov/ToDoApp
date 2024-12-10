using ToDoApp.Data.Models;
using Task = System.Threading.Tasks.Task;

namespace ToDoApp.Core.Services.Interfaces
{
    public interface IProjectService
    {
        Task<List<Project>> GetUserAllProjects(int userId);
        Task<Project> GetProjectById(int id);
        Task CreateProject(Project project);
        Task UpdateProject(Project project);
        Task DeleteProject(int id);
    }
}