using AutoMapper;
using ToDoApp.Api.DTOs;
using ToDoApp.Data.Models;
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

            CreateMap<Project, ProjectDto>();
            CreateMap<CreateProjectDto, Project>();
            CreateMap<ProjectDto, Project>();

            CreateMap<RegisterRequest, User>();
        }
    }
}