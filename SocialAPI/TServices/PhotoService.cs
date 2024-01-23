using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;

namespace SocialAPI.TServices
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var account = new Account(config.Value.CloudName, config.Value.APIKey, config.Value.APISecret);
            _cloudinary = new Cloudinary(account);
        }



        public async Task<ImageUploadResult> AddImageAsync(IFormFile file)
        {
            var uploadImageResult = new ImageUploadResult();
            if(file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.Name, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                    Folder = "Tb-Batch1"
                };
                uploadImageResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadImageResult;

        }




        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
           return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}
