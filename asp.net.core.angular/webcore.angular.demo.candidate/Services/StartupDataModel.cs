﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webcore.angular.demo.candidate.Models;
using webcore.angular.demo.candidate.Models.Repository;

namespace webcore.angular.demo.candidate.Services
{
    public static class StartupDataModel
    {
        public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            
        }

        public static void ConfigureServices(IServiceCollection services, IConfiguration Configuration)
        {
            //... set Application Database Context as a service
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //... set Repository
            services.AddScoped<CandidateRepository>();
            services.AddScoped<RepositoryInterface<Candidate>, CandidateRepository>();
        }
    }
}
