namespace TensorSnake.Services.Score.Services.Data
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using TensorSnake.Services.Score.Data.Contracts;
    using TensorSnake.Services.Score.Data.Models;
    using TensorSnake.Services.Score.Services.Data.Contracts;

    public class GameScoreService : IGameScoreService
    {
        private readonly IDeletableEntityRepository<GameScore> _gameScoreRepository;

        public GameScoreService(
            IDeletableEntityRepository<GameScore> gameScoreRepository
        )
        {
            this._gameScoreRepository = gameScoreRepository ?? throw new ArgumentNullException(nameof(gameScoreRepository));
        }

        public IQueryable<GameScore> GetAll()
        {
            return _gameScoreRepository.All();
        }

        public async Task<GameScore> Create(string userId, string userEmail, int highScore)
        {
            var newGameScore = new GameScore()
            {
                UserId = userId,
                UserEmail = userEmail,
                HighScore = highScore
            };

            _gameScoreRepository.Add(newGameScore);
            await _gameScoreRepository.SaveChangesAsync();

            return newGameScore;
        }
    }
}
