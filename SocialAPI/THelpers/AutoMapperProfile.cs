using AutoMapper;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.TExtensions;

namespace SocialAPI.THelpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AppUser, MemberDto>().ForMember(dest => dest.PhotoUrl,
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age,
                opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<Photo, PhotoForApprovalDto>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.AppUser.Id))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.AppUser.UserName));
            CreateMap<MemberUpdateDto, AppUser>();

            CreateMap<RegisterDto, AppUser>();


            CreateMap<Message, MessageDto>().ForMember(dest => dest.SenderPhotoUrl,
                opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl,
                opt => opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));

        }
    }
}
