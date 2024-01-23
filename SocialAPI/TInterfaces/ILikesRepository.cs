using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.THelpers;

namespace SocialAPI.TInterfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);

    }
}
