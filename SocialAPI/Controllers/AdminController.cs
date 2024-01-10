using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.TExtensions;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;

namespace SocialAPI.Controllers
{

    public class AdminController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;

        public AdminController(UserManager<AppUser> userManager, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .OrderBy(x => x.UserName)
                .Select(x => new
                {
                    x.Id,
                    Username = x.UserName,
                    Roles = x.UserRoles.Select(r => r.Role.Name).ToList()
                }).ToListAsync();
            return Ok(users);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {

            if (string.IsNullOrEmpty(roles)) return BadRequest("You must select at least one role");

            var selectedRoles = roles.Split(",").ToArray(); //  Admin
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) return NotFound();

            var userRoles = await _userManager.GetRolesAsync(user); // Modertor and Member
            var results = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));
            if (!results.Succeeded) return BadRequest("Failed to add to roles");

            results = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
            if (!results.Succeeded) return BadRequest("Failed to remvoe to roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public async Task<ActionResult<PagedList<PhotoForApprovalDto>>> GetPhotosForModeration([FromQuery] PhotoParams photoParams)
        {
            var photos = await _unitOfWork.PhotoRepository.GetUnapprovedPhotos(photoParams.PageNumber, photoParams.PageSize);
            Response.AddPaginationHeader(new PaginationHeader(photos.CurrentPage,
                photos.PageSize, photos.TotalCount, photos.TotalPages));
            return Ok(photos);
        }


        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("photos-to-approve")]
        public async Task<ActionResult<PhotoDto>> ApprovePhoto([FromBody] PhotoParams photoParams)
        {
            var photo = await _unitOfWork.PhotoRepository.ApprovePhotoById(photoParams);
            if (await _unitOfWork.Complete()) return Ok(photo);
            return BadRequest("Problem approving the photo");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPut("photos-to-reject")]
        public async Task<ActionResult<PhotoDto>> PhotoReject([FromQuery] int id)
        {
            var photo = await _unitOfWork.PhotoRepository.RejectPhoto(id);
            if (await _unitOfWork.Complete()) return Ok(photo);
            return BadRequest("Problem Rejecting the photo");
        }

    }
}
