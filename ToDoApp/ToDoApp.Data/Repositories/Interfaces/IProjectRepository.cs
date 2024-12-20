using ToDoApp.Data.Models;

namespace ToDoApp.Data.Repositories.Interfaces
{
    public interface IProjectRepository : IBaseRepository<Project>
    {
        Task<List<Project>> GetProjectsByUser(int userId);
    }
}