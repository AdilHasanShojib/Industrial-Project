﻿namespace SocialAPI.TDto
{
    public class PhotoForApprovalDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public bool IsApproved { get; set; }
        public bool IsRejected { get; set; }
        public string Username { get; set; }

        public string UserId { get; set; }
    }
}
