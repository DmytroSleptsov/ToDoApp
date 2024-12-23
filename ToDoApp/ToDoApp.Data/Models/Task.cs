﻿namespace ToDoApp.Data.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public required User User { get; set; }

        public int ProjectId { get; set; }
        public required Project Project { get; set; }
    }
}