using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TData;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using System.Security.Cryptography;
using System.Text;

namespace SocialAPI.Controllers
{
    public class AuthoController : BaseController
    {
        private readonly TDataContex _context;

        public AuthoController(TDataContex context)
        {
            _context = context;
        }

        [HttpPost("register")]

        public async Task<ActionResult<AppUser>> UserRegister(RegisterDto registerDto)
        {
            if(await IsuserExists(registerDto.UserName)) return BadRequest("UserName is already Exist!");

            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Name = registerDto.UserName,
                passwordhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                passwordsalt = hmac.Key
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            //return 0k(user);

            return Ok(user);


        }

        

        [HttpPost("login")]


        public async Task<ActionResult<AppUser>> UserLoging(LoginDto loginDto)
        {



                var user=await _context.Users.SingleOrDefaultAsync(x =>x.Name.ToLower()==loginDto.UserName.ToLower());
                if (user==null) { return Unauthorized("Invalid UserName"); }
                using var hmac= new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i=0;i<computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
                
            }

            return Ok(user);



        }


        private async Task<bool> IsuserExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.Name.ToLower() == userName.ToLower());
        }




    }
}
