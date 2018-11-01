namespace TensorSnake.Services.Scores.Services.Data.Tests.GameScoreService
{
    using System.Collections.Generic;
    using System.Linq;

    using Moq;

    using TensorSnake.Services.Score.Data.Contracts;
    using TensorSnake.Services.Score.Data.Models;
    using TensorSnake.Services.Score.Services.Data;

    using Xunit;

    public class GetAll_Should
    {
        [Fact]
        public void GameScoreService_GetAll_Should_ReturnAllGameScores()
        {
            // Arrange
            var fakeData = new List<GameScore>()
            {
                new GameScore(),
                new GameScore(),
                new GameScore()
            }.AsQueryable();

            var mockGameScoreRepository = new Mock<IDeletableEntityRepository<GameScore>>();

            mockGameScoreRepository.Setup(x => x.All()).Returns(fakeData);

            var gameScoreService = new GameScoreService(mockGameScoreRepository.Object);

            // Act
            var allGameScores = gameScoreService.GetAll();

            // Assert
            Assert.Equal(fakeData.Count(), allGameScores.Count());
        }
    }
}
