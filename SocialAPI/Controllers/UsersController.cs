using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TData;
using SocialAPI.TDto;
using SocialAPI.TEntities;
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
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            
            return Ok(await _unitOfWork.UserRepository.GetMembersAsync());
        }


        [Authorize]

        [HttpGet("get-userByid/{Name}")]
        public async Task<ActionResult<MemberDto>> GetUsersByID(string userName)
        {
            var user= await _unitOfWork.UserRepository.GetMemberAsync(userName);
            return Ok(user);
        }

    }
}
