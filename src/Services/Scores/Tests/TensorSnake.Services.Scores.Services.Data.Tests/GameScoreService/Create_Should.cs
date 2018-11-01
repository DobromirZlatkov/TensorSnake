namespace TensorSnake.Services.Scores.Services.Data.Tests.GameScoreService
{
    using System;

    using Moq;

    using TensorSnake.Services.Score.Data.Contracts;
    using TensorSnake.Services.Score.Data.Models;
    using TensorSnake.Services.Score.Services.Data;

    using Xunit;

    public class Create_Should
    {
        [Fact]
        public async void GameScoreService_Create_Should_CreateNewGameScores()
        {
            // Arrange
            var fakeScoreGame = new GameScore()
            {
                UserId = Guid.NewGuid().ToString(),
                UserEmail = Guid.NewGuid().ToString(),
                HighScore = 42
            };

            var mockGameScoreRepository = new Mock<IDeletableEntityRepository<GameScore>>();
            var gameScoreService = new GameScoreService(mockGameScoreRepository.Object);

            // Act
            var newScoreGame = await gameScoreService.Create(fakeScoreGame.UserId, fakeScoreGame.UserEmail, fakeScoreGame.HighScore);

            // Assert
            Assert.Equal(fakeScoreGame.UserId, newScoreGame.UserId);
            Assert.Equal(fakeScoreGame.UserEmail, newScoreGame.UserEmail);
            Assert.Equal(fakeScoreGame.HighScore, newScoreGame.HighScore);
        }

        [Fact]
        public async void GameScoreService_Create_Should_CallExactlyOnce_GameScoreRepository_AddMethod()
        {
            // Arrange
            var fakeScoreGame = new GameScore()
            {
                UserId = Guid.NewGuid().ToString(),
                UserEmail = Guid.NewGuid().ToString(),
                HighScore = 42
            };

            var mockGameScoreRepository = new Mock<IDeletableEntityRepository<GameScore>>();
            var gameScoreService = new GameScoreService(mockGameScoreRepository.Object);

            // Act
            await gameScoreService.Create(fakeScoreGame.UserId, fakeScoreGame.UserEmail, fakeScoreGame.HighScore);

            // Assert
            mockGameScoreRepository.Verify(x => x.Add(It.IsAny<GameScore>()), Times.Once);
        }

        [Fact]
        public async void GameScoreService_Create_Should_CallExactlyOnce_GameScoreRepository_SaveChangesAsyncMethod()
        {
            // Arrange
            var fakeScoreGame = new GameScore()
            {
                UserId = Guid.NewGuid().ToString(),
                UserEmail = Guid.NewGuid().ToString(),
                HighScore = 42
            };

            var mockGameScoreRepository = new Mock<IDeletableEntityRepository<GameScore>>();
            var gameScoreService = new GameScoreService(mockGameScoreRepository.Object);

            // Act
            await gameScoreService.Create(fakeScoreGame.UserId, fakeScoreGame.UserEmail, fakeScoreGame.HighScore);

            // Assert
            mockGameScoreRepository.Verify(x => x.SaveChangesAsync(), Times.Once);
        }
    }
}
