using TftSimBackend.Models;
using BCrypt.Net;

namespace TftSimBackend.Data
{
    public static class Seed
    {
        public static void Initialize(TftSimContext context)
        {
            context.Database.EnsureCreated();

            // ✅ Seed champions if empty
            if (!context.Champions.Any())
            {
                context.Champions.AddRange(
                    new Champion { Name = "Vayne", IconUrl = "/champions/vayne.png", AD = 60, AS = 0.8, HP = 800, Armor = 25, MR = 25 },
                    new Champion { Name = "Jhin", IconUrl = "/champions/jhin.png", AD = 80, AS = 0.7, HP = 850, Armor = 20, MR = 20 },
                    new Champion { Name = "Cho'Gath", IconUrl = "/champions/chogath.png", AD = 60, AS = 0.6, HP = 1200, Armor = 45, MR = 40 }
                );
            }

            // ✅ Seed items if empty
            if (!context.Items.Any())
            {
                context.Items.AddRange(
                    new Item { Name = "Infinity Edge", IconUrl = "/items/infinity-edge.png", AD = 30, CritChance = 0.15, CritDamage = 0.25 },
                    new Item { Name = "Guinsoo's Rageblade", IconUrl = "/items/guinsoos-rageblade.png", AS = 0.4 },
                    new Item { Name = "Deathblade", IconUrl = "/items/deathblade.png", AD = 20 },
                    new Item { Name = "Sunfire Cape", IconUrl = "/items/sunfire-cape.png", HP = 150, Armor = 20 },
                    new Item { Name = "Warmog's Armor", IconUrl = "/items/warmogs-armor.png", HP = 600 },
                    new Item { Name = "Redemption", IconUrl = "/items/redemption.png", HP = 250, MR = 20 }
                );
            }

            // ✅ Seed default admin user if no users exist
            if (!context.Users.Any())
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword("Ylh060899");
                context.Users.Add(new User
                {
                    Username = "yuanlinhao1999@gmail.com",
                    PasswordHash = hashedPassword,
                    IsAdmin = true
                });
            }

            context.SaveChanges();
        }
    }
}
