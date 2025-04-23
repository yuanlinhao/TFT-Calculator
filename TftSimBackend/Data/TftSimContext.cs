using Microsoft.EntityFrameworkCore;
using TftSimBackend.Models;

namespace TftSimBackend.Data;

public class TftSimContext : DbContext
{
    public TftSimContext(DbContextOptions<TftSimContext> options) : base(options) { }

    public DbSet<Champion> Champions { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<User> Users { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Champion>().ToTable("Champions");
        modelBuilder.Entity<Item>().ToTable("Items");
    }
}
