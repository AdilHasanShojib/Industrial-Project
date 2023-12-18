using Microsoft.AspNetCore.Mvc;
using SocialAPI.TDto;
using SocialAPI.THelpers;

namespace SocialAPI.Controllers
{
    public class LikesController
    {





















        [HttpGet()]
        public async Task<ActionResult<PagedList<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams)
        {

        }


    }
}
