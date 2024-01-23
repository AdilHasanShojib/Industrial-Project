using SocialAPI.TEntities;

namespace SocialAPI.TInterfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser users);
    }
}
