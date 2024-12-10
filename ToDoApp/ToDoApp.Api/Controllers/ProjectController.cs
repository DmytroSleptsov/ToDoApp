using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDoApp.Api.DTOs;
using ToDoApp.Core.Services.Interfaces;
using ToDoApp.Data.Models;

namespace ToDoApp.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly IMapper _mapper;

        public ProjectController(IProjectService projectService, IMapper mapper)
        {
            _projectService = projectService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProjectDto>>> GetAllProjects()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var projects = await _projectService.GetUserAllProjects(int.Parse(userId!));

            var projectDtos = _mapper.Map<List<ProjectDto>>(projects);
            return Ok(projectDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProjectById(int id)
        {
            var project = await _projectService.GetProjectById(id);
            if (project == null)
            {
                return NotFound();
            }

            var projectDto = _mapper.Map<ProjectDto>(project);

            return Ok(projectDto);
        }

        [HttpPost]
        public async Task<ActionResult> CreateProject([FromBody] CreateProjectDto createProjectDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var project = _mapper.Map<Project>(createProjectDto);
            project.UserId = int.Parse(userId!);

            await _projectService.CreateProject(project);

            var projectDto = _mapper.Map<ProjectDto>(project);
            return CreatedAtAction(nameof(GetProjectById), new { id = projectDto.Id }, projectDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProject(int id, ProjectDto projectDto)
        {
            var project = await _projectService.GetProjectById(id);
            if (project == null)
            {
                return NotFound();
            }

            _mapper.Map(projectDto, project);

            await _projectService.UpdateProject(project);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            var project = await _projectService.GetProjectById(id);
            if (project == null)
            {
                return NotFound();
            }

            await _projectService.DeleteProject(id);
            return NoContent();
        }
    }
}