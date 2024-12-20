namespace ToDoApp.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public byte[] PasswordHash { get; set; } = [];
        public byte[] PasswordSalt { get; set; } = [];

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Task> Tasks { get; set; } = [];
        public List<Project> Projects { get; set; } = [];
    }
}