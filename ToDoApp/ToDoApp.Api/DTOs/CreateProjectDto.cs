using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Api.DTOs
{
    public class CreateProjectDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}