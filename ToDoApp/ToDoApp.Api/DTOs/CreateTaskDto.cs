using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Api.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
    }
}