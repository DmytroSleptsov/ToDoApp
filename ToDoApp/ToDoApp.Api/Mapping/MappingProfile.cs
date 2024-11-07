using AutoMapper;
using ToDoApp.Api.DTOs;
using ToDoTask = ToDoApp.Data.Models.Task;

namespace ToDoApp.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<ToDoTask, TaskDto>();
            CreateMap<CreateTaskDto, ToDoTask>();
            CreateMap<TaskDto, ToDoTask>();
        }
    }
}