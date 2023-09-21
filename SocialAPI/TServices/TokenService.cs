using Microsoft.IdentityModel.Tokens;
using SocialAPI.TEntities;
using SocialAPI.TInterfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SocialAPI.TServices
{
    public class TokenService:ITokenService
    {

        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

      public async Task<string> CreateToken(AppUser users)
        {
            var claims= new List<Claim>
            {

                new Claim(JwtRegisteredClaimNames.NameId, users.Id.ToString()),
                 new Claim(JwtRegisteredClaimNames.UniqueName, users.Name)



            };


            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                SigningCredentials = creds,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token=tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);



        }
    }
}
