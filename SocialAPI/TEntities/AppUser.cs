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


        public string Email { get; set; }
        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public string Country { get; set; }
        public string City { get; set; }





















    }
}
