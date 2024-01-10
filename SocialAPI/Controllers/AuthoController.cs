using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TData;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.TInterfaces;
using System.Security.Cryptography;
using System.Text;

namespace SocialAPI.Controllers
{
    public class AuthController : BaseController
    {
        private readonly TDataContext _context;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;

        public AuthController(TDataContext context,
            IMapper mapper,
            ITokenService tokenService,
            UserManager<AppUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        // User Register

        [HttpPost("register")] // POST: api/auth/register
        public async Task<ActionResult<UserDto>> UserRegister(RegisterDto registerDto)
        {
            if (await IsUserExists(registerDto.Username)) return BadRequest("Username is already exists!");
            var user = _mapper.Map<AppUser>(registerDto);
            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);


            var userToken = new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
            return Ok(userToken);
        }

        [HttpPost("login")] // POST: api/auth/login
        public async Task<ActionResult<UserDto>> UserLoging(LoginDto loginDto)
        {
            var user = await _context.Users.Include(x => x.Photos).FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());
            if (user == null) return Unauthorized("Invalid Username");
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!result) return Unauthorized("Invalid Password");

            var userToken = new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                Gender = user.Gender,
                KnownAs = user.KnownAs,
                PhotoUrl = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url

            };
            return Ok(userToken);
        }

        private async Task<bool> IsUserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }
    }
}
