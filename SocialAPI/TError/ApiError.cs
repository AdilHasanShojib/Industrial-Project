namespace SocialAPI.TError
{
    public class ApiError
    {
        public ApiError(int statusCode, string  message, string stacktrace)
        {
            StatusCode = statusCode;
            Message = message;
            StackTrace = stacktrace;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
    }
}
