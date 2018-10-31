namespace TensorSnake.Services.Score.API
{
    using Autofac;
    using Autofac.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Swashbuckle.AspNetCore.Swagger;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Reflection;
    using TensorSnake.Services.Score.API.Infrastructure.AutofacModules;
    using TensorSnake.Services.Score.API.Infrastructure.Filters;
    using TensorSnake.Services.Score.Data;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services
                .AddDatabase(Configuration)
                .AddOptions()
                .Configure<ScoreSettings>(Configuration) // Setup settings class from settings file
                .AddSwaggerGen(options => // Add swagger documentation for the microservice
                {
                    options.DescribeAllEnumsAsStrings();
                    options.SwaggerDoc("v1", new Info
                    {
                        Title = "TensorSnake - Score HTTP API",
                        Version = "v1",
                        Description = "The Score Microservice HTTP API. This is a Data-Driven/CRUD microservice sample",
                        TermsOfService = "Terms Of Service"
                    });

                    options.AddSecurityDefinition("oauth2", new OAuth2Scheme
                    {
                        Type = "oauth2",
                        Flow = "implicit",
                        AuthorizationUrl = $"{Configuration.GetValue<string>("IdentityUrl")}/connect/authorize",
                        TokenUrl = $"{Configuration.GetValue<string>("IdentityUrl")}/connect/token",
                        Scopes = new Dictionary<string, string>()
                        {
                            { "score", "Score API" }
                        }
                    });

                    options.OperationFilter<AuthorizeCheckOperationFilter>();
                })
                .AddCustomAuthentication(Configuration)
                .AddCors(options =>  // Configure CORS
                {
                    options.AddPolicy("CorsPolicy",
                        builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
                })
                .AddMvc()
                .AddControllersAsServices();

            // configure autofac
            var container = new ContainerBuilder();
            container.Populate(services);
            
            container.RegisterModule(new ScoreServicesModule());
            container.RegisterModule(new ScoreDataModule());

            return new AutofacServiceProvider(container.Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
         
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            //// IMPORTANT ! Configuring auth should be before configuring swagger because authentication doesn't work.
            ConfigureAuth(app);

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "api/v1/{controller=Home}/{action=Index}/{id?}");
            });

            var pathBase = Configuration["PATH_BASE"];

            app.UseSwagger()
               .UseSwaggerUI(c =>
               {
                   c.SwaggerEndpoint($"{ (!string.IsNullOrEmpty(pathBase) ? pathBase : string.Empty) }/swagger/v1/swagger.json", "Score.API V1");
                   c.OAuthClientId("Scoreswaggerui");
                   c.OAuthAppName("Score Swagger UI");
               });
             
        }

        protected virtual void ConfigureAuth(IApplicationBuilder app)
        {
            app.UseAuthentication();
        }
    }

    static class CustomExtensionsMethods
    {
        public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            var identityUrl = configuration.GetValue<string>("IdentityUrl");

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.Authority = identityUrl;
                options.RequireHttpsMetadata = false;
                options.Audience = "score";
            });

            return services;
        }
        
        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddEntityFrameworkNpgsql().AddDbContext<ScoreDbContext>(options =>
                options.UseNpgsql(configuration.GetValue<string>("NpgConnectionString"),
                  npgsqlOptionsAction: npgsqlOption =>
                  {
                      npgsqlOption.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
                      npgsqlOption.EnableRetryOnFailure(maxRetryCount: 2, maxRetryDelay: TimeSpan.FromSeconds(2), errorCodesToAdd: null);
                  }));    

            return services;
        }
    }
}
