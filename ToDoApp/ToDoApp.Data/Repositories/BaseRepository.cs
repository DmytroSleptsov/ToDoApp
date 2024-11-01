using Microsoft.EntityFrameworkCore;
using ToDoApp.Data.Repositories.Interfaces;

namespace ToDoApp.Data.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T>
        where T : class
    {
        protected readonly DbContext _dbContext;

        public BaseRepository(DbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<T> GetById(int id)
        {
            return await _dbContext.Set<T>()
                .FindAsync(id);
        }

        public async Task<List<T>> GetAll()
        {
            return await _dbContext.Set<T>()
                .ToListAsync();
        }

        public async Task Add(T entity)
        {
            _dbContext.Add(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(T entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var task = await _dbContext.Set<T>().FindAsync(id);
            if (task == null)
            {
                throw new KeyNotFoundException($"Task with id {id} not found.");
            }

            _dbContext.Remove(task);

            await _dbContext.SaveChangesAsync();
        }
    }
}