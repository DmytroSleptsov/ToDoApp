using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Api.DTOs;
using ToDoApp.Core.Services.Interfaces;
using ToDoApp.Data.Models;

namespace ToDoApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public AuthController(IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = _mapper.Map<User>(request);
            await _authService.RegisterAsync(user, request.Password);
            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.AuthenticateAsync(request.Email, request.Password);
            return Ok(new { Token = token });
        }
    }
}