namespace TensorSnake.Services.Score.API.ViewModels
{
    using System.ComponentModel.DataAnnotations;

    public class GameScoreRequestViewModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string UserEmail { get; set; }

        [Required]
        public int HighScore { get; set; }
    }
}
