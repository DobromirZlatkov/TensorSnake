namespace TensorSnake.Services.Score.API
{
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using System.IO;
    using TensorSnake.BuildingBlocks.WebHost.Customization;
    using TensorSnake.Services.Score.Data;

    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args)
              .MigrateDbContext<ScoreDbContext>((_, __) => { })
              .Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .ConfigureAppConfiguration((builderContext, config) =>
                {
                    config.AddEnvironmentVariables();
                })
                .Build();
    }
}
