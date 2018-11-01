namespace TensorSnake.Services.Score.API.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using TensorSnake.Services.Score.API.ViewModels;
    using TensorSnake.Services.Score.Services.Data.Contracts;

    [Authorize]
    [Route("api/v1/[controller]/[action]/")]
    public class GameScoreController : ControllerBase
    {
        private readonly IGameScoreService _gameScoreService;

        public GameScoreController(
            IGameScoreService gameScoreService
            )
        {
            _gameScoreService = gameScoreService ?? throw new ArgumentNullException(nameof(gameScoreService));
        }

        /// <summary>
        /// GET api/v1/[controller]/All
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet]
        public async Task<IActionResult> All()
        {
            // TODO add select
            var gameScoresList = await _gameScoreService
                .GetAll()
                .OrderBy(x => x.HighScore)
                .Select(GameScoreViewModel.FromGameScoreViewModel)
                .ToListAsync();

            return Ok(gameScoresList);
        }
    }
}
