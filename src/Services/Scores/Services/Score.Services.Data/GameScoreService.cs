namespace TensorSnake.Services.Score.Services.Data
{
    using System;
    using System.Linq;
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
    }
}
