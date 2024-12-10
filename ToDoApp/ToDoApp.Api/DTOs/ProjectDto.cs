using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Api.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
    }
}