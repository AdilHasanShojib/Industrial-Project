using Microsoft.EntityFrameworkCore;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.TExtensions;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;

namespace SocialAPI.TData
{
    public class LikesRepository : ILikesRepository
    {
        private readonly TDataContext _dataContext;
        public LikesRepository(TDataContext context)
        {
            _dataContext = context;
        }

       

        public async Task<UserLike> GetUserLike(int sourceUserId, int targetUserId)
        {
            return await _dataContext.Likes.FindAsync(sourceUserId, targetUserId);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _dataContext.Users.Include(x => x.LikedUsers).FirstOrDefaultAsync(x => x.Id == userId);
        }
        public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams)
        {
            var users = _dataContext.Users.OrderBy(u => u.UserName).AsQueryable();

            var likes = _dataContext.Likes.AsQueryable();

            if(likesParams.Predicate == "liked")
            {
                likes = likes.Where(x => x.SourceUserId == likesParams.UserId);
                users = likes.Select(x => x.TargetUser);
            }

            if (likesParams.Predicate == "likedBy")
            {
                likes = likes.Where(x => x.TargetUserId == likesParams.UserId);
                users = likes.Select(x => x.SourceUser);
            }

            var likedUsers = users.Select(user => new LikeDto
            {
                Id = user.Id,
                UserName = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = user.City
            });
            return await PagedList<LikeDto>.CreatePagedAsync(likedUsers, likesParams.PageNumber, likesParams.PageSize);

        }
    }
}
