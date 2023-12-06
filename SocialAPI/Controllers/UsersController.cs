using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TData;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;

namespace SocialAPI.Controllers
{
    [Authorize]
    public class UsersController : BaseController
    {

        

        private readonly IUnitOfWork _unitOfWork;

        public UsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        //{

        //    return Ok(await _unitOfWork.UserRepository.GetMembersAsync());
        //}



        [HttpGet]
        public async Task<ActionResult<PagedList<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            return Ok(await _unitOfWork.UserRepository.GetMembersAsync(userParams));
        }

        //[HttpGet("id")]
        //public ActionResult<AppUser> GetUsersById(int id)
        //{
        //    var user = _context.Users.Find(id);
        //    return Ok(user);
        //}

        [Authorize]

        [HttpGet("get-userByid/{Name}")]
        public async Task<ActionResult<MemberDto>> GetUsersByID(string userName)
        {
            var user= await _unitOfWork.UserRepository.GetMemberAsync(userName);
            return Ok(user);
        }

    }
}
