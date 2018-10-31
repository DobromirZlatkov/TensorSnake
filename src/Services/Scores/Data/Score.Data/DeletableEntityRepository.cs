namespace TensorSnake.Services.Score.Data
{
    using Contracts;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Linq;
    using TensorSnake.Services.Score.Data.Common.Models;

    public class DeletableEntityRepository<T> : EfGenericRepository<T>, IDeletableEntityRepository<T> where T : class, IDeletableEntity
    {
        public DeletableEntityRepository(IScoreDbContext context)
            : base(context)
        {
        }

        public override IQueryable<T> All()
        {
            return base.All().Where(x => !x.IsDeleted);
        }

        public IQueryable<T> AllWithDeleted()
        {
            return base.All();
        }

        public override void Delete(T entity)
        {
            entity.IsDeleted = true;
            entity.DeletedOn = DateTime.Now;

            var entry = this.Context.Entry(entity);
            entry.State = EntityState.Modified;
        }

        public void ActualDelete(T entity)
        {
            base.Delete(entity);
        }
    }
}
