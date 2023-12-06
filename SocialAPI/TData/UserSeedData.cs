using Microsoft.EntityFrameworkCore;
using SocialAPI.TEntities;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SocialAPI.TData
{
    public class UserSeedData
    {

        public static async Task SeedUsers(TDataContex context)
        {
            if (await context.Users.AnyAsync()) return;
            var userData = await File.ReadAllTextAsync("TData/UserSeedData.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Start123Pass"));
                user.PasswordSalt = hmac.Key;
                context.Users.Add(user);
            }
            await context.SaveChangesAsync();

        }












    }
}
