using SocialAPI.TDto;
using SocialAPI.TEntities;

namespace SocialAPI.TInterfaces
{
    public interface IUserRepository
    {


        Task<IEnumerable<AppUser>> GetMembersAsync();
        Task<MemberDto> GetMemberAsync(String userName);




    }
}
