using CloudinaryDotNet.Actions;
using SocialAPI.TInterfaces;

namespace SocialAPI.TServices
{
    public class PhotoService : IPhotoService
    {
        public Task<ImageUploadResult> AddImage(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public Task<DeletionResult> DeleteImage(string publicId)
        {
            throw new NotImplementedException();
        }
    }
}
