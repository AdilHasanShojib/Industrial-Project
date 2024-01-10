using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;

namespace SocialAPI.TData
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly TDataContext _context;
        private readonly IMapper _mapper;

        public PhotoRepository(TDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<PhotoForApprovalDto>> GetUnapprovedPhotos(int pagNumber, int pageSize)
        {
            var query = _context.Photos.Where(x => !x.IsApproved).AsQueryable();
            var photos = query.ProjectTo<PhotoForApprovalDto>(_mapper.ConfigurationProvider);
            return await PagedList<PhotoForApprovalDto>.CreatePagedAsync(photos, pagNumber, pageSize);
        }
        public async Task<PhotoDto> ApprovePhotoById(PhotoParams photoParams)
        {
            var photo = await _context.Photos.Where(x => x.Id == photoParams.PhotoId).FirstOrDefaultAsync();
            var query = await _context.Photos.Where(x => x.AppUserId == photoParams.UserId).ToListAsync();
            if (photo == null) return new PhotoDto();
            if(!query.Any(x => x.IsMain))
            {
                photo.IsMain = true;
            }
            if(!photo.IsApproved)
            {
                photo.IsApproved = true;
            }
            var result = _mapper.Map<PhotoDto>(photo);

            return result;

        }

        public async Task<Photo> GetPhotoById(int PhotoId)
        {
            return await _context.Photos.FirstOrDefaultAsync(x => x.Id == PhotoId);
        }

   

        public async Task<PhotoDto> RejectPhoto(int photoId)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(x => x.Id == photoId);
            if (photo == null) return new PhotoDto();
            photo.IsApproved = false;
            photo.IsRejected = true;
            var result = _mapper.Map<PhotoDto>(photo);
            return result;
        }
    }
}
