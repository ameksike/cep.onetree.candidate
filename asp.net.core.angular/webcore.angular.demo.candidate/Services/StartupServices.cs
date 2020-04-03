using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webcore.angular.demo.candidate.Services
{
    public static class StartupServices
    {
        public static void ConfigureServices(IServiceCollection services) {
            services.AddScoped<IdentityServiceInterface, IdentityService>();
            services.AddScoped<AccountServiceInterface, AccountService>();
        }
    }
}
