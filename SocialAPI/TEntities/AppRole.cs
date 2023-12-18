using Microsoft.AspNetCore.Identity;

namespace SocialAPI.TEntities
{
    public class AppRole: IdentityRole<int>
    {



        public ICollection<AppUserRole> UserRoles { get; set; }




    }
}
