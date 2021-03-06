﻿using IdentityServer4.EntityFramework.DbContexts;
using TensorSnake.BuildingBlocks.WebHost.Customization;
using TensorSnake.Services.Identity.API.Data;
namespace TensorSnake.Services.Identity.API
{
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using System.IO;

    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args)
             .MigrateDbContext<PersistedGrantDbContext>((_, __) => { })
             .MigrateDbContext<ApplicationDbContext>((context, services) =>
             {
                 var env = services.GetService<IHostingEnvironment>();
                 var logger = services.GetService<ILogger<ApplicationDbContextSeed>>();
                 var settings = services.GetService<IOptions<AppSettings>>();

                 new ApplicationDbContextSeed()
                     .SeedAsync(context, env, logger, settings)
                     .Wait();
             })
             .MigrateDbContext<ConfigurationDbContext>((context, services) =>
             {
                 var configuration = services.GetService<IConfiguration>();

                 new ConfigurationDbContextSeed()
                     .SeedAsync(context, configuration)
                     .Wait();
             }).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .ConfigureAppConfiguration((builderContext, config) =>
                {
                    config.AddEnvironmentVariables();
                })
                .ConfigureLogging((hostingContext, builder) =>
                {
                    builder.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                    builder.AddConsole();
                    builder.AddDebug();
                })
                .Build();
    }
}
