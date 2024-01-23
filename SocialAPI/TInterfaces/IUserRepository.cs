using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.THelpers;

namespace SocialAPI.TInterfaces
{
    public interface IUserRepository
    {
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);

        Task<MemberDto> GetMemberAsync(string userName);

        Task<AppUser> GetUserByNameAsync(string name);


    }
}
