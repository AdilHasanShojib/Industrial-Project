namespace SocialAPI.THelpers
{
    public class PhotoParams : PaginationParams
    {
        public int? PhotoId { get; set; }
        public int? UserId { get; set; }

        public string PhotoUrl { get; set; }
    }
}
