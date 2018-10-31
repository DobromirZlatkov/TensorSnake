namespace TensorSnake.Services.Score.Data.Contracts
{
    using Microsoft.EntityFrameworkCore;

    using TensorSnake.Services.Score.Data.Models;

    public interface IScoreDbContext
    {
        DbSet<GameScore> GameScores { get; }
        
        DbContext DbContext { get; }

        DbSet<T> Set<T>() where T : class;

        int SaveChanges();

        void Dispose();
    }
}
