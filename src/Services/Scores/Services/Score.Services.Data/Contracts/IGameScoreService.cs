namespace TensorSnake.Services.Score.Services.Data.Contracts
{
    using System.Linq;
    using TensorSnake.Services.Score.Data.Models;

    public interface IGameScoreService : IService
    {
        IQueryable<GameScore> GetAll();
    }
}
