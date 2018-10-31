namespace TensorSnake.Services.Score.API.ViewModels
{
    using System;
    using System.Linq.Expressions;
    using TensorSnake.Services.Score.Data.Models;

    public class GameScoreViewModel
    {
        public static Expression<Func<GameScoreViewModel, GameScore>> FromGameScoreViewModel
        {
            get
            {
                return
                    gameScore => new GameScore
                    {
                        UserId = gameScore.UserId,
                        HighScore = gameScore.HighScore,
                        UserEmail = gameScore.UserEmail
                    };
            }
        }

        public string UserId { get; set; }

        public string UserEmail { get; set; }

        public int HighScore { get; set; }
    }
}
