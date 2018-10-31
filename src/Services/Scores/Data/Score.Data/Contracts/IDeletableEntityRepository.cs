namespace TensorSnake.Services.Score.Data.Contracts
{
    using System.Linq;

    using TensorSnake.Services.Score.Data.Common.Models;

    public interface IDeletableEntityRepository<T> : IRepository<T> where T : class, IDeletableEntity
    {
        IQueryable<T> AllWithDeleted();

        void ActualDelete(T entity);
    }
}
