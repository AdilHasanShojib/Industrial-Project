using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SocialAPI.TData
{
    public class UserSeedData
    {

        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;
            var userData = await File.ReadAllTextAsync("Tdata/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

            // Roles
            var roles = new List<AppRole>
            {
                new AppRole {Name = "Member"},
                new AppRole {Name = "Admin"},
                new AppRole {Name = "Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
                user.LastActive = DateTime.SpecifyKind(user.LastActive, DateTimeKind.Utc);
                user.DateOfBirth = DateTime.SpecifyKind(user.DateOfBirth, DateTimeKind.Utc);
                user.Photos.FirstOrDefault(x => x.IsMain)!.IsApproved = true;
                user.Photos.FirstOrDefault(x => x.IsMain)!.IsRejected = false;
                await userManager.CreateAsync(user, "Start12345@");
                await userManager.AddToRoleAsync(user, "Member");
            }

            try
            {
                var admin = new AppUser
                {
                    UserName = "admin",
                    Gender = "female",
                    DateOfBirth = DateTime.UtcNow,
                    KnownAs = "Admin",
                    Created = DateTime.UtcNow,
                    LastActive = DateTime.UtcNow,
                    Introduction = "Admin Intro",
                    LookingFor = "Male",
                    Interests = "Travelling",
                    City = "Weiterstadt",
                    Country = "Germany",
                    Photos = new List<Photo>
                    {
                        new Photo { Url= "https://randomuser.me/api/portraits/women/51.jpg",
                                    IsMain= true}
                    }
                };
                await userManager.CreateAsync(admin, "Start12345@");
                await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            //foreach (var user in users)
            //{
            //    using var hmac = new HMACSHA512();
            //    //user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Start123Pass@"));
            //    //user.PasswordSalt = hmac.Key;
            //    context.Users.Add(user);
            //}

            //await context.SaveChangesAsync();
        }
    }
}
