namespace SocialAPI.TError
{
    public class ApiError
    {
        public ApiError(int statusCode, string message, string stackTrace)
        {
            StatusCode = statusCode;
            Message = message;
            StackTrace = stackTrace;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }


    }
}
