using Microsoft.AspNetCore.Http.HttpResults;
using SocialAPI.TEntities;

namespace SocialAPI.TDto
{
    public class MemberDto
    {


        public int Id { get; set; }
        public string Name { get; set; }


        public string Firstname { get; set; }
        public string Lastname { get; set; }


        public int Age { get; set; }

        public DateTime DateOfBirth
        {

            get;

            set;
        }


        public DateTime Created
        {
            get;
            set;
        }

        public string PhotoUrl { get; set; }

        public DateTime LastActive
        {
            get;
            set;
        }


        public string Email { get; set; }
        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public string Country { get; set; }
        public string City { get; set; }



        public List<PhotoDto> Photos { get; set; }




        public string Introduction { get; set; }
        public string LookingFor { get; set; }

        public string Interests { get; set; }













    }
}
