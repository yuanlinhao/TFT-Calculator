using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TftSimBackend.Data;
using TftSimBackend.Models;

namespace TftSimBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Require auth by default
public class AdminController : ControllerBase
{
    private readonly TftSimContext _context;

    public AdminController(TftSimContext context)
    {
        _context = context;
    }

    private bool IsAdmin()
    {
        return User.Claims.Any(c => c.Type == "isAdmin" && c.Value == "true");
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        if (!IsAdmin()) return Forbid();

        var users = await _context.Users
            .Select(u => new { u.Id, u.Username, u.IsAdmin })
            .ToListAsync();

        return Ok(users);
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        if (!IsAdmin()) return Forbid();

        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "User deleted" });
    }

    [HttpPost("champions")]
    public async Task<IActionResult> AddChampion([FromBody] Champion champion)
    {
        if (!IsAdmin()) return Forbid();

        // Ignore any client-sent ID just to be safe
        champion.Id = 0;

        _context.Champions.Add(champion);
        await _context.SaveChangesAsync();
        return Ok(champion);
    }

    [HttpPost("items")]
    public async Task<IActionResult> AddItem([FromBody] Item item)
    {
        if (!IsAdmin()) return Forbid();

        item.Id = 0;

        _context.Items.Add(item);
        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpPatch("champions/{id}")]
    public async Task<IActionResult> UpdateChampion(int id, [FromBody] Champion updated)
    {
        if (!IsAdmin()) return Forbid();

        var existing = await _context.Champions.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = updated.Name;
        existing.IconUrl = updated.IconUrl;
        existing.AD = updated.AD;
        existing.AS = updated.AS;
        existing.HP = updated.HP;
        existing.Armor = updated.Armor;
        existing.MR = updated.MR;

        await _context.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("champions/{id}")]
    public async Task<IActionResult> DeleteChampion(int id)
    {
        if (!IsAdmin()) return Forbid();

        var champ = await _context.Champions.FindAsync(id);
        if (champ == null) return NotFound();

        _context.Champions.Remove(champ);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Champion deleted" });
    }

    [HttpPatch("items/{id}")]
    public async Task<IActionResult> UpdateItem(int id, [FromBody] Item updated)
    {
        if (!IsAdmin()) return Forbid();

        var existing = await _context.Items.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = updated.Name;
        existing.IconUrl = updated.IconUrl;
        existing.AD = updated.AD;
        existing.AS = updated.AS;
        existing.CritChance = updated.CritChance;
        existing.CritDamage = updated.CritDamage;
        existing.HP = updated.HP;
        existing.Armor = updated.Armor;
        existing.MR = updated.MR;
        existing.SpecialEffect = updated.SpecialEffect;

        await _context.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("items/{id}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
        if (!IsAdmin()) return Forbid();

        var item = await _context.Items.FindAsync(id);
        if (item == null) return NotFound();

        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Item deleted" });
    }

}
