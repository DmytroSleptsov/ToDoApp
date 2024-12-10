using ToDoApp.Core.Services.Interfaces;
using ToDoApp.Data.Models;
using ToDoApp.Data.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace ToDoApp.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task CreateProject(Project project)
        {
            await _projectRepository.Add(project);
        }

        public async Task DeleteProject(int id)
        {
            await _projectRepository.Delete(id);
        }

        public async Task<Project> GetProjectById(int id)
        {
            return await _projectRepository.GetById(id);
        }

        public async Task<List<Project>> GetUserAllProjects(int userId)
        {
            return await _projectRepository.GetProjectsByUser(userId);
        }

        public async Task UpdateProject(Project project)
        {
            await _projectRepository.Update(project);
        }
    }
}