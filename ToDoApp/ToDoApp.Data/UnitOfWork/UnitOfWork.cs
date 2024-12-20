using Microsoft.EntityFrameworkCore.Storage;
using ToDoApp.Data.Repositories.Interfaces;

namespace ToDoApp.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TasksDbContext _dbContext;
        private IDbContextTransaction? _transaction;

        public IUserRepository Users { get; }
        public IProjectRepository Projects { get; }
        public ITaskRepository Tasks { get; }

        public UnitOfWork(
            TasksDbContext dbContext,
            IUserRepository userRepository,
            IProjectRepository projectRepository,
            ITaskRepository taskRepository)
        {
            _dbContext = dbContext;
            Users = userRepository;
            Projects = projectRepository;
            Tasks = taskRepository;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _dbContext.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task RollbackTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _transaction?.Dispose();
                _transaction = null;
            }
            _dbContext.Dispose();
        }
    }
}