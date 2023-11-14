using AutoMapper;
using SocialAPI.TInterfaces;

namespace SocialAPI.TData
{
    public class UnitOfWork : IUnitOfWork


    {

        private readonly TDataContex _context;
        private readonly IMapper _mapper;

        public UnitOfWork(TDataContex context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context,_mapper);
    }
}
