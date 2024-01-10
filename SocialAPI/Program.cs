
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SocialAPI.TData;
using SocialAPI.TEntities;
using SocialAPI.TExtensions;
using SocialAPI.TInterfaces;
using SocialAPI.TMiddleware;
using SocialAPI.TServices;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationService(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);



builder.Services.AddSwaggerGen();

var app = builder.Build();
//app.UseMiddleware<ErrorMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

//app.UseAuthorization();
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200"));

app.MapControllers();

using var scope =app.Services.CreateScope();
var services=scope.ServiceProvider;

try
{
    var context = services.GetService<TDataContex>();
    if(context != null)
    {
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
        await context.Database.MigrateAsync();
        await UserSeedData.SeedUsers(context);

    }
}

catch (Exception ex)
{
  var logger = services.GetService<ILogger<Program>>();
    logger?.LogError(ex, "An error occued during migrations");


}





app.Run();