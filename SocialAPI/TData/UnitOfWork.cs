using AutoMapper;
using SocialAPI.TInterfaces;

namespace SocialAPI.TData
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TDataContext _context;
        private readonly IMapper _mapper;

        public UnitOfWork(TDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public ILikesRepository LikesRepository => new LikesRepository(_context);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public IPhotoRepository PhotoRepository => new PhotoRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
