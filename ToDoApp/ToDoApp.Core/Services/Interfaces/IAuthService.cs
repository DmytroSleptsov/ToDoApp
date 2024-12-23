﻿using ToDoApp.Data.Models;
using Task = System.Threading.Tasks.Task;

namespace ToDoApp.Core.Services.Interfaces
{
    public interface IAuthService
    {
        Task RegisterUserWithDefaultProjectAsync(User user, string password);
        Task<string> AuthenticateAsync(string email, string password);
    }
}