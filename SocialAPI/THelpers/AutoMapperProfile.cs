using AutoMapper;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.TExtensions;

namespace SocialAPI.THelpers
{
    public class AutoMapperProfile: Profile
    {

       public AutoMapperProfile() {

            CreateMap<AppUser, MemberDto>().ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();   
        
        
        
        
        }





    }
}
