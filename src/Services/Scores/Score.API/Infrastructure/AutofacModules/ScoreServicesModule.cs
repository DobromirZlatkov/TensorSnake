namespace TensorSnake.Services.Score.API.Infrastructure.AutofacModules
{
    using System.Reflection;

    using Autofac;

    using TensorSnake.Services.Score.Services.Data.Contracts;
    using TensorSnake.Services.Score.Services.Data;

    public class ScoreServicesModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(GameScoreService).GetTypeInfo().Assembly)
                .AssignableTo<IService>()
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}

