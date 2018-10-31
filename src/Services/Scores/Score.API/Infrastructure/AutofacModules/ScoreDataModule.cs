namespace TensorSnake.Services.Score.API.Infrastructure.AutofacModules
{
    using Autofac;

    using TensorSnake.Services.Score.Data;
    using TensorSnake.Services.Score.Data.Contracts;

    public class ScoreDataModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder
                 .RegisterGeneric(typeof(DeletableEntityRepository<>))
                 .As(typeof(IDeletableEntityRepository<>))
                 .InstancePerLifetimeScope();

            builder
                .RegisterGeneric(typeof(EfGenericRepository<>))
                .As(typeof(IRepository<>))
                .InstancePerLifetimeScope();

            builder
                .RegisterType<ScoreDbContext>()
                .As<IScoreDbContext>()
                .InstancePerLifetimeScope();
        }
    }
}
