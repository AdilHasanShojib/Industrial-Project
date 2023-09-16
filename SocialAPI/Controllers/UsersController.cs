using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TData;
using SocialAPI.TEntities;

namespace SocialAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly TDataContex _context;

        public UsersController(TDataContex context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            
            return Ok(await _context.Users.ToListAsync());
        }



        [HttpGet("id")]
        public async Task<ActionResult<AppUser>> GetUsersByID(int id)
        {
            var user=await _context.Users.FindAsync(id);
            return Ok(user);
        }

    }
}
