using System.ComponentModel.DataAnnotations;

namespace SocialAPI.TDto
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }

        public string Firstname { get; set; }
        public string Lastname { get; set; }

       

        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Email { get; set; }
        public string Gender { get; set; }

        public string KnownAs { get; set; }

        public string Country { get; set; }

        public string City { get; set; }
    }
}
