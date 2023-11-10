using Microsoft.EntityFrameworkCore;
using SocialAPI.TEntities;

namespace SocialAPI.TData
{
    public class TDataContex : DbContext
    {
        public TDataContex(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }

        public DbSet<AppUser> Photos { get; set; }
    }
}
