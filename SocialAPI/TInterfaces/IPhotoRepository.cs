using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.THelpers;

namespace SocialAPI.TInterfaces
{
    public interface IPhotoRepository
    {
        Task<PagedList<PhotoForApprovalDto>> GetUnapprovedPhotos(int pagNumber, int pageSize);
        Task<PhotoDto> ApprovePhotoById(PhotoParams photoParams);
        Task<Photo> GetPhotoById(int PhotoId);
        Task<PhotoDto> RejectPhoto(int photoId);

    }
}
