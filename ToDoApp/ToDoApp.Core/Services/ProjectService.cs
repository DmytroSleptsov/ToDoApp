using Microsoft.Extensions.Configuration;
using ToDoApp.Core.Services.Interfaces;
using ToDoApp.Data.Models;
using ToDoApp.Data.UnitOfWork;
using Task = System.Threading.Tasks.Task;

namespace ToDoApp.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        public ProjectService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        public async Task CreateProject(Project project)
        {
            _unitOfWork.Projects.Add(project);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteProject(int id)
        {
            await _unitOfWork.Projects.Delete(id);
        }

        public async Task<Project> GetProjectById(int id)
        {
            return await _unitOfWork.Projects.GetById(id);
        }

        public async Task<List<Project>> GetUserAllProjects(int userId)
        {
            return await _unitOfWork.Projects.GetProjectsByUser(userId);
        }

        public async Task UpdateProject(Project project)
        {
            _unitOfWork.Projects.Update(project);
            await _unitOfWork.SaveChangesAsync();
        }

        public void CreateDefaultProjectAsync(User user)
        {
            var defaultProjectName = _configuration["DefaultProject:Name"]
                ?? "Default Project";

            var defaultProject = new Project
            {
                Name = defaultProjectName,
                UserId = user.Id,
                User = user,
                IsDefault = true
            };

            _unitOfWork.Projects.Add(defaultProject);
        }
    }
}