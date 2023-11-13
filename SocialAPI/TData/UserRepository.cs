using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.TInterfaces;

namespace SocialAPI.TData
{
    public class UserRepository : IUserRepository


    {
        private readonly TDataContex _context;
        private readonly IMapper _mapper;


        public UserRepository(TDataContex context, IMapper mapper) {

            _context = context;
            _mapper = mapper;


        }

        
       
        
        
        public async Task<MemberDto> GetMemberAsync(string userName)
        {
            var user = _context.Users.Include(x => x.Photos).FirstOrDefaultAsync(x => x.Name.ToLower() == userName.ToLower());

            if (user == null) { return new MemberDto(); }

            //var mapped = new MemberDto
            //{


            //    Name = user.Name,

            //    Photos = new List<PhotoDto>
            //    {
            //        new PhotoDto {

            //         Url = user?.Photos.FirstOrDefault(x => x.IsMain).Url,



            //        }

            //    },
            //};
            //
            //
            //return mapped;

            var newUser=_mapper.Map<MemberDto>(user);
            return newUser;


        }




        public async Task<IEnumerable<AppUser>> GetMembersAsync()
        {
            return await _context.Users.Include(x => x.Photos).ToListAsync();
        }




    }



    
}
