using CloudinaryDotNet.Actions;

namespace SocialAPI.TInterfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddImageAsync(IFormFile file);
        Task<DeletionResult> DeleteImageAsync(string  publicId);

    }
}
