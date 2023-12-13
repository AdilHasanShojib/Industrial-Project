using System.Security.Claims;




namespace SocialAPI.TExtensions
{
    public static class ClaimPrincipleExtension
    {



        public static string GetUserName(this ClaimsPrincipal user) { return user.FindFirst(ClaimTypes.Name)?.Value; }
        public static string GetUserId(this ClaimsPrincipal user) { return Convert.ToInt32(user.FindFirst(ClaimTypes.NameIdentifier)?.Value); }







    }
}
