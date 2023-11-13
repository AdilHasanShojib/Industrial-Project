using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace SocialAPI.TEntities
{
    public class AppUser
    {
      public int Id { get; set; }
      public string Name { get; set; }

      public byte[] PasswordHash { get; set; }
       
      public byte[] PasswordSalt {  get; set; }

        public string Firstname { get; set; }
        public string Lastname { get; set; }
        private DateTime _dateofBirth;
        
        public DateTime DateOfBirth { 
            
            get => _dateofBirth; 
            
            set => _dateofBirth=value.ToUniversalTime(); }

        private DateTime _created = DateTime.UtcNow;

        public DateTime Created
        {
            get => _created;
            set => _created = value.ToUniversalTime();
        }

        private DateTime _lastActive = DateTime.UtcNow;
        public DateTime LastActive
        {
            get => _lastActive;
            set => _lastActive = value.ToUniversalTime();
        }


        public string Email { get; set; }
        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public string Country { get; set; }
        public string City { get; set; }



       public List<Photo> Photos { get; set; }

















    }
}
