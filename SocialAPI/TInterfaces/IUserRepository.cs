using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.THelpers;

namespace SocialAPI.TInterfaces
{
    public interface IUserRepository
    {


        Task<IEnumerable<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(String userName);




    }
}
