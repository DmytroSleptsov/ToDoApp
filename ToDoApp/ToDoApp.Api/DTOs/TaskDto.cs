using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Api.DTOs
{
    public class TaskDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public int ProjectId { get; set; }
    }
}