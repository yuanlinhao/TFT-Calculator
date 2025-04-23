using Microsoft.AspNetCore.Mvc;
using TftSimBackend.Data;
using TftSimBackend.Models;

namespace TftSimBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly TftSimContext _context;

        public ItemsController(TftSimContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Item>> GetAllItems()
        {
            return Ok(_context.Items.ToList());
        }
    }
}
