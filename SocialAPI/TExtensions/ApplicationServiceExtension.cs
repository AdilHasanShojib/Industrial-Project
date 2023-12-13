using Microsoft.EntityFrameworkCore;
using SocialAPI.TData;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;
using SocialAPI.TServices;

namespace SocialAPI.TExtensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration config) {


            services.AddCors();
            services.AddHttpContextAccessor();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();

           services.AddDbContext<TDataContex>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("LearnSocialApp"));

            });
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<IPhotoService,PhotoService>();


            return services;
        
        }



    }
}
