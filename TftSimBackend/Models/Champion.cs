namespace TftSimBackend.Models;

public class Champion
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public double AD { get; set; }
    public double AS { get; set; }
    public int HP { get; set; }
    public int Armor { get; set; }
    public int MR { get; set; }
}
