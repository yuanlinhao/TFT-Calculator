import { useItemStore } from "../store/useItemStore";
import { useChampionStore } from "../store/useChampionStore";

type Props = {
  role: "attacker" | "target";
  championName: string;
  items: string[];
};

const BASE_CRIT_CHANCE = 0.25;
const BASE_CRIT_DAMAGE = 1.5;

function StatLine({
  icon,
  label,
  base,
  value,
  isPercent = false,
}: {
  icon: string;
  label: string;
  base: number;
  value: number;
  isPercent?: boolean;
}) {
  const boosted = value > base;
  return (
    <p className="flex items-center gap-2">
      <img src={`/icon/${icon}.svg`} alt={label} className="w-4 h-4" />
      {label}: {isPercent ? Math.round(base) : base}
      {isPercent ? "%" : ""} ➜{" "}
      <strong className={boosted ? "text-green-400" : ""}>
        {isPercent ? Math.round(value) : value.toFixed(2)}
        {isPercent ? "%" : ""}
      </strong>
    </p>
  );
}

function ChampionStatsPanel({ role, championName, items }: Props) {
  const { champions } = useChampionStore();
  const { items: allItems } = useItemStore();

  const champ = champions.find((c) => c.name === championName);
  if (!champ) return null;

  const bonus = {
    ad: 0,
    as: 0,
    hp: 0,
    armor: 0,
    mr: 0,
    critChance: 0,
    critDamage: 0,
  };

  items.forEach((itemName) => {
    const item = allItems.find((i) => i.name === itemName);
    if (!item) return;
    bonus.ad += item.ad || 0;
    bonus.as += item.as || 0;
    bonus.hp += item.hp || 0;
    bonus.armor += item.armor || 0;
    bonus.mr += item.mr || 0;
    bonus.critChance += item.critChance || 0;
    bonus.critDamage += item.critDamage || 0;
  });

  return (
    <div className="bg-zinc-800 p-3 rounded text-white text-sm space-y-1">
      <p className="font-semibold">{championName} Stats</p>

      {role === "attacker" && (
        <>
          <StatLine icon="ad" label="AD" base={champ.ad} value={champ.ad + bonus.ad} />
          <StatLine icon="as" label="AS" base={champ.as} value={champ.as + bonus.as} />
          <StatLine
            icon="crit"
            label="Crit Chance"
            base={BASE_CRIT_CHANCE * 100}
            value={(BASE_CRIT_CHANCE + bonus.critChance) * 100}
            isPercent
          />
          <StatLine
            icon="crit-damage"
            label="Crit Damage"
            base={BASE_CRIT_DAMAGE * 100}
            value={(BASE_CRIT_DAMAGE + bonus.critDamage) * 100}
            isPercent
          />
        </>
      )}

      {role === "target" && (
        <>
          <StatLine icon="hp" label="HP" base={champ.hp} value={champ.hp + bonus.hp} />
          <StatLine icon="armor" label="Armor" base={champ.armor} value={champ.armor + bonus.armor} />
          <StatLine icon="mr" label="MR" base={champ.mr} value={champ.mr + bonus.mr} />
        </>
      )}

      {items.some((item) => item !== "None") && (
        <div className="flex gap-2 mt-2">
          {items.map((item, index) => {
            const icon = allItems.find((i) => i.name === item)?.iconUrl;
            return (
              <img
                key={index}
                src={icon || "/items/empty-slot.svg"}
                alt={item}
                title={item}
                className="w-6 h-6 rounded border border-gray-700"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ChampionStatsPanel;
