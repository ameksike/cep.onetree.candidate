using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webcore.angular.demo.candidate.Models;

namespace webcore.angular.demo.candidate.Services
{
    public static class StartupSecurity
    {
        public static void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            app.UseAuthentication();
        }

        public static void ConfigureServices(IServiceCollection services, IConfiguration Configuration)
        {
            //... set CorsPolicy 
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                );
            });

            //... set form options 
            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            //... set security options 
            services.AddIdentity<ApplicationUser, IdentityRole>()
              .AddEntityFrameworkStores<ApplicationDbContext>()
              .AddDefaultTokenProviders();

            //... set security 
            /*services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                 options.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidateIssuer = true,
                     ValidateAudience = true,
                     ValidateLifetime = true,
                     ValidateIssuerSigningKey = true,
                     ValidIssuer = "mydomain.com",
                     ValidAudience = "mydomain.com",
                     IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(Configuration["APP_SECRET_KEY"]) //
                     ),
                     ClockSkew = TimeSpan.Zero
                 });*/
        }
    }
}
