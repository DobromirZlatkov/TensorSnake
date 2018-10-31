namespace TensorSnake.Services.Score.Data
{
    using Microsoft.EntityFrameworkCore;

    using TensorSnake.Services.Score.Data.Contracts;
    using TensorSnake.Services.Score.Data.Models;

    public class ScoreDbContext : DbContext, IScoreDbContext
    {
        public DbSet<GameScore> GameScores { get; set; }
        
        public DbContext DbContext
        {
            get
            {
                return this;
            }
        }

        public ScoreDbContext(DbContextOptions<ScoreDbContext> options) : base(options)
        {
        }
    }
}
