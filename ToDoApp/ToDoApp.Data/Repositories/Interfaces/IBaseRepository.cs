namespace ToDoApp.Data.Repositories.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task<T> GetById(int id);
        Task<List<T>> GetAll();
        void Add(T entity);
        void Update(T entity);
        Task Delete(int id);
    }
}