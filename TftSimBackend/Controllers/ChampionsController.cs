using Microsoft.AspNetCore.Mvc;
using TftSimBackend.Data;
using TftSimBackend.Models;

namespace TftSimBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChampionsController : ControllerBase
    {
        private readonly TftSimContext _context;

        public ChampionsController(TftSimContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Champion>> GetAllChampions()
        {
            return Ok(_context.Champions.ToList());
        }
    }
}
