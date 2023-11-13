using AutoMapper;
using SocialAPI.TDto;
using SocialAPI.TEntities;

namespace SocialAPI.THelpers
{
    public class AutoMapperProfile: Profile
    {

       public AutoMapperProfile() {

            CreateMap<AppUser,MemberDto>();
            CreateMap<Photo, PhotoDto>();
        
        
        
        
        }





    }
}
