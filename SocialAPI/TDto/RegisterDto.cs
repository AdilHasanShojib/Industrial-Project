using System.ComponentModel.DataAnnotations;

namespace SocialAPI.TDto
{
    public class RegisterDto
    {


        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(8,MinimumLength =4)]
        public string Password { get; set; }
    }
}
