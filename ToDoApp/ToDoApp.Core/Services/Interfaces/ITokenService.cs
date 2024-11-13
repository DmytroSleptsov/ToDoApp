using ToDoApp.Data.Models;

namespace ToDoApp.Core.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
