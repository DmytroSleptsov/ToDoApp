using Microsoft.AspNetCore.Mvc;

namespace ToDoApp.Api.Controllers
{
    public class RegistrationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
