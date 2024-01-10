using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TData;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.TExtensions;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;
using System.Security.Claims;

namespace SocialAPI.Controllers
{

    [Authorize]
    public class UsersController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }


        [HttpGet]
        public async Task<ActionResult<PagedList<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var users = await _unitOfWork.UserRepository.GetMembersAsync(userParams);
            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages));
            return Ok(users);
        }



        [HttpGet("get-userByName/{userName}")]
        public async Task<ActionResult<MemberDto>> GetUsersById(string userName)
        {
            var user = await _unitOfWork.UserRepository.GetMemberAsync(userName);
            return Ok(user);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {

            var user = await _unitOfWork.UserRepository.GetUserByNameAsync(User.GetUserName());
            if (user == null) return NotFound();
            _mapper.Map(memberUpdateDto, user);
            if (await _unitOfWork.Complete()) return NoContent();
            return BadRequest("Failed to update user");
        }

        [HttpPost("add-image")]
        public async Task<ActionResult<PhotoDto>> AddUserImage(IFormFile file)
        {
            var user = await _unitOfWork.UserRepository.GetUserByNameAsync(User.GetUserName());
            if (user == null) return NotFound();
            var result = await _photoService.AddImageAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
            };
            user.Photos.Add(photo);
            if (await _unitOfWork.Complete())
            {
                return CreatedAtAction(nameof(GetUsersById), new { userName = user.UserName }, _mapper.Map<PhotoDto>(photo));
            }
            return BadRequest("Problem adding user image");

        }

        [HttpPut("set-main-image/{photoId}")]
        public async Task<ActionResult> SetMainImage(int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByNameAsync(User.GetUserName());
            if (user == null) return NotFound();

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("This photo is already set as your main photo");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.Complete()) return NoContent();
            return BadRequest("Problem occured to set this image as main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeleteUserImage(int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByNameAsync(User.GetUserName());
            if (user == null) return NotFound();


            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You can't delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeleteImageAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }
            user.Photos.Remove(photo);
            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Problem to add set main photo");
        }
    }
}

