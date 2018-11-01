namespace TensorSnake.Services.Score.API.ViewModels
{
    using System;
    using System.Linq.Expressions;
    using TensorSnake.Services.Score.Data.Models;

    public class GameScoreViewModel
    {
        public static Expression<Func<GameScore, GameScoreViewModel>> FromGameScoreViewModel
        {
            get
            {
                return
                    gameScore => new GameScoreViewModel
                    {
                        UserId = gameScore.UserId,
                        UserEmail = gameScore.UserEmail,
                        HighScore = gameScore.HighScore,
                    };
            }
        }

        public string UserId { get; set; }

        public string UserEmail { get; set; }

        public int HighScore { get; set; }
    }
}
