namespace TensorSnake.Services.Identity.API.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using TensorSnake.Services.Identity.API.Models;
    using TensorSnake.Services.Identity.API.ViewModels;

    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;

        public AccountController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
            };
            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Errors.Count() > 0)
            {
                // If we got this far, something failed, redisplay form
                return BadRequest(ModelState);
            }

            return Ok();
        }
    }
}
