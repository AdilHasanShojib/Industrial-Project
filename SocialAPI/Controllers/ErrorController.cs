using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialAPI.TData;
using SocialAPI.TEntities;

namespace SocialAPI.Controllers
{
    public class ErrorController : BaseController
    {
        private readonly TDataContex _dataContex;

        public ErrorController(TDataContex dataContex)
        {
            _dataContex = dataContex;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<string> GetUserSecret()
        {

            return Ok("secret text");

        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var user = _dataContex.Users.Find(-1);
            if(user == null) { return NotFound(); }
            return Ok(user);

        }



        [HttpGet("server-error")]
        public ActionResult<AppUser> GetServerError()
        {
            var user = _dataContex.Users.Find(-1);
            //if (user == null) { return NotFound(); }
            var userTostring =user.ToString();
            return Ok(user);

        }


        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not the correct Request");

        }






    }
}
