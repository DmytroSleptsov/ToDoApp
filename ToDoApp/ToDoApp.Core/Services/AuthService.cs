using ToDoApp.Core.Services.Interfaces;
using ToDoApp.Data.Models;
using ToDoApp.Data.UnitOfWork;
using Task = System.Threading.Tasks.Task;

namespace ToDoApp.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordService _passwordService;
        private readonly ITokenService _tokenService;
        private readonly IProjectService _projectService;

        public AuthService( 
            IUnitOfWork unitOfWork,
            IPasswordService passwordService, 
            ITokenService tokenService,
            IProjectService projectService)
        {
            _unitOfWork = unitOfWork;
            _passwordService = passwordService;
            _tokenService = tokenService;
            _projectService = projectService;
        }

        public async Task RegisterUserWithDefaultProjectAsync(User user, string password)
        {
            if (await _unitOfWork.Users.UserExistsAsync(user.Email))
            {
                throw new InvalidOperationException("User already exists.");
            }

            SetUserPassword(user, password);

            await _unitOfWork.BeginTransactionAsync();
            try
            {
                _unitOfWork.Users.Add(user);
                _projectService.CreateDefaultProjectAsync(user);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }

        public async Task<string> AuthenticateAsync(string email, string password)
        {
            var user = await _unitOfWork.Users.GetUserByEmailAsync(email);
            if (user is null || 
                !_passwordService.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                throw new UnauthorizedAccessException("Invalid username or password.");
            }

            return _tokenService.GenerateToken(user);
        }

        private void SetUserPassword(User user, string password)
        {
            _passwordService
                .CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
        }
    }
}