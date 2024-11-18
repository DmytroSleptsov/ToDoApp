using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDoApp.Api.DTOs;
using ToDoApp.Core.Services.Interfaces;
using ToDoTask = ToDoApp.Data.Models.Task;

namespace ToDoApp.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly IMapper _mapper;

        public TaskController(ITaskService taskService, IMapper mapper) 
        {
            _taskService = taskService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskDto>>> GetAllTasks()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var tasks = await _taskService.GetUserAllTasks(int.Parse(userId!));

            var taskDtos = _mapper.Map<List<TaskDto>>(tasks);
            return Ok(taskDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTaskById(int id)
        {
            var task = await _taskService.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }

            var taskDto = _mapper.Map<TaskDto>(task);

            return Ok(taskDto);
        }

        [HttpPost]
        public async Task<ActionResult> CreateTask([FromBody]CreateTaskDto createTaskDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var task = _mapper.Map<ToDoTask>(createTaskDto);
            task.UserId = int.Parse(userId!);

            await _taskService.CreateTask(task);

            var taskDto = _mapper.Map<TaskDto>(task);
            return CreatedAtAction(nameof(GetTaskById), new { id = taskDto.Id }, taskDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, TaskDto taskDto)
        {
            var task = await _taskService.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }

            _mapper.Map(taskDto, task);

            await _taskService.UpdateTask(task);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            var task = await _taskService.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }

            await _taskService.DeleteTask(id);
            return NoContent();
        }
    }
}