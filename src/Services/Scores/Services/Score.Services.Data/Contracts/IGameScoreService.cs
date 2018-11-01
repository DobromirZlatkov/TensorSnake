namespace TensorSnake.Services.Score.Services.Data.Contracts
{
    using System.Linq;
    using System.Threading.Tasks;
    using TensorSnake.Services.Score.Data.Models;

    public interface IGameScoreService : IService
    {
        IQueryable<GameScore> GetAll();

        Task<GameScore> Create(string userId, string userEmail, int highScore);
    }
}
