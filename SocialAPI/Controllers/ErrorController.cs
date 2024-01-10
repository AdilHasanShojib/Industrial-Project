using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialAPI.TData;
using SocialAPI.TEntities;

namespace SocialAPI.Controllers
{
    public class ErrorController : BaseController
    {
        private readonly TDataContext _dataContext;

        public ErrorController(TDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetUserSecrete()
        {
            return Ok("secret text");
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var user = _dataContext.Users.Find(-1);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet("server-error")]
        public ActionResult<AppUser> GetServerError()
        {
            var user = _dataContext.Users.Find(-1);
            var userToString = user.ToString();
            return Ok(user);
        }

        [HttpGet("bad-request")]

        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not the correct request");
        }

    }
}
