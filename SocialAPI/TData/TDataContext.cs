using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TEntities;

namespace SocialAPI.TData
{
    public class TDataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, 
        AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public TDataContext(DbContextOptions options) : base(options)
        {
        }

    

        public DbSet<Photo> Photos { get; set; }

        public DbSet<UserLike> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<AppUser>()
                .HasMany(x => x.UserRoles)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired();
            modelBuilder.Entity<AppRole>()
                    .HasMany(x => x.UserRoles)
                    .WithOne(x => x.Role)
                    .HasForeignKey(x => x.RoleId)
                    .IsRequired();

            modelBuilder.Entity<UserLike>().HasKey(k => new { k.SourceUserId, k.TargetUserId });
            modelBuilder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(x => x.LikedUsers)
                .HasForeignKey(k => k.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<UserLike>()
                .HasOne(s => s.TargetUser)
                .WithMany(x => x.LikedByUsers)
                .HasForeignKey(k => k.TargetUserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Message>()
                .HasOne(s => s.Recipient)
                .WithMany(x => x.MessagesRecieved)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Message>()
                .HasOne(s => s.Sender)
                .WithMany(x => x.MessagesSent)
               .OnDelete(DeleteBehavior.Restrict);

        }

    }
}
