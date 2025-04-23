namespace TftSimBackend.Models;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public double? AD { get; set; }
    public double? AS { get; set; }
    public double? CritChance { get; set; }
    public double? CritDamage { get; set; }
    public double? HP { get; set; }
    public double? Armor { get; set; }
    public double? MR { get; set; }
    public string? SpecialEffect { get; set; }
}
