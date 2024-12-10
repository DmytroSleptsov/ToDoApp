namespace ToDoApp.Data.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public required User User { get; set; }
        public List<Task> Tasks { get; set; } = [];
    }
}