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
    public class AuthoController : BaseController
    {
        private readonly TDataContex _context;
        private readonly ITokenService _tokenService;

        public AuthoController(TDataContex context,ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> UserRegister(RegisterDto registerDto)
        {
            if(await IsuserExists(registerDto.UserName)) return BadRequest("UserName is already Exist!");

            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Name = registerDto.UserName,
                Firstname=registerDto.Firstname,
                Lastname=registerDto.Lastname,
                Email=registerDto.Email,
                KnownAs = registerDto.KnownAs,
                DateOfBirth=registerDto.DateOfBirth,
                    City=registerDto.City,
                    Gender=registerDto.Gender,
                    Country=registerDto.Country,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            //return 0k(user);
            var userToken = new UserDto
            {
                Username = user.Name,
                Token = await _tokenService.CreateToken(user)


            };

            return Ok(userToken);


        }

        

        [HttpPost("login")]


        public async Task<ActionResult<UserDto>> UserLoging(LoginDto loginDto)
        {



                var user=await _context.Users.FirstOrDefaultAsync(x =>x.Name.ToLower()==loginDto.UserName.ToLower());
                if (user==null) { return Unauthorized("Invalid UserName"); }
                using var hmac= new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i=0;i<computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
                
            }
            var userToken = new UserDto
            {
                Username = user.Name,
                Token = await _tokenService.CreateToken(user)


            };

            return Ok(userToken);



        }


        private async Task<bool> IsuserExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.Name.ToLower() == userName.ToLower());
        }




    }
}
