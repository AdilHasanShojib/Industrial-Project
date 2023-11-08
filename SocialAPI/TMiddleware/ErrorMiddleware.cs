using SocialAPI.TError;
using System.Net;
using System.Text.Json;

namespace SocialAPI.TMiddleware
{
    public class ErrorMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ErrorMiddleware(RequestDelegate next, ILogger<ErrorMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }


        public async Task TaskAsync(HttpContext context)
        {

            try
            {
                await _next(context);
            }


            catch (Exception ex) {
            
                _logger.LogError(ex,ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment() ?
                    new ApiError(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) :
                    new ApiError(context.Response.StatusCode, ex.Message, "Internal Server Error");
                var options=new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);



            }




        }















    }
}
