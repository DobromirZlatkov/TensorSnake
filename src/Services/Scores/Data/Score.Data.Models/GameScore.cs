namespace TensorSnake.Services.Score.Data.Models
{
    using TensorSnake.Services.Score.Data.Common.Models;

    public class GameScore : DeletableEntity
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string UserEmail { get; set; }

        public int HighScore { get; set; }
    }
}
