namespace SocialAPI.TEntities
{
    public class AppUser
    {
      public int Id { get; set; }
      public string Name { get; set; }

      public byte[] PasswordHash { get; set; }
        public object passwordhash { get; internal set; }
        public byte[] PasswordSalt {  get; set; }
        public object passwordsalt { get; internal set; }
    }
}
