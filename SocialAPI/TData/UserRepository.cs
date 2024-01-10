using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;

namespace SocialAPI.TData
{
    public class UserRepository : IUserRepository
    {
        private readonly TDataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(TDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberDto> GetMemberAsync(string userName)
        {

            if(string.IsNullOrWhiteSpace(userName)) throw new ArgumentNullException(nameof(userName));

            var user = await _context.Users
               .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.UserName.ToLower() == userName.ToLower());

            if (user == null) return new MemberDto();

       

            return user;
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var usersQuery =  _context.Users.Include(x => x.Photos).AsQueryable();

            if (!usersQuery.Any()) return new PagedList<MemberDto>();

            // Filter, Search, Orderby
            usersQuery = usersQuery.Where(x => x.UserName != userParams.CurrentUsername);
            usersQuery = usersQuery.Where(x => x.Gender != userParams.Gender);

            //var result = _mapper.Map<MemberDto>(usersQuery);
            //var mappedusers = new List<MemberDto>();

            //foreach (var item in usersQuery)
            //{
            //    var user = new MemberDto
            //    {
            //        UserName = item?.UserName,
            //        Photos = new List<PhotoDto>
            //    {
            //        new PhotoDto
            //        {
            //            Url = item?.Photos.FirstOrDefault(x => x.IsMain).Url,
            //        }
            //    }
            //    };
            //    mappedusers.Add(user);
            //}

            var queryResult = usersQuery.AsNoTracking().ProjectTo<MemberDto>(_mapper.ConfigurationProvider);

            return await PagedList<MemberDto>.CreatePagedAsync(queryResult, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<AppUser> GetUserByNameAsync(string name)
        {

            if (string.IsNullOrEmpty(name)) throw new ArgumentNullException(nameof(name));

            return await _context.Users.Include(p => p.Photos)               
                .FirstOrDefaultAsync(x => x.UserName.ToLower() == name.ToLower());
        }
    }
}
