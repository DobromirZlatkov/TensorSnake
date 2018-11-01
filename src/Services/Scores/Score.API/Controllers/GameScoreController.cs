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
        public async Task<IActionResult> All(int page = 1, int pageSize = 10)
        {
            var gameScoresList = await _gameScoreService
               .GetAll()
               .OrderByDescending(x => x.HighScore)
               .Skip((page - 1) * pageSize)
               .Take(pageSize)
               .Select(GameScoreResponseViewModel.FromGameScore)
               .ToListAsync();

            return Ok(gameScoresList);
        }

        /// <summary>
        /// Post api/v1/[controller]/Create
        /// </summary>
        /// <param name="model">Requested data use to create new score model</param>
        /// <returns>New score model</returns>
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]GameScoreRequestViewModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newGame = await this._gameScoreService.Create(model.UserId, model.UserEmail, model.HighScore);

            return Ok(newGame);
        }
    }
}
