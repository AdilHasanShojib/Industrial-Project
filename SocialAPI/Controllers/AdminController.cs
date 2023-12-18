using Microsoft.AspNetCore.Mvc;

namespace SocialAPI.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
