using Microsoft.EntityFrameworkCore;

namespace ToDoApp.Data
{
    public class TasksDbContext : DbContext
    {
        public TasksDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) {}

        public DbSet<Models.Task> Tasks { get; set; }
    }
}
