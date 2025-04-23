import { useChampionStore } from "../store/useChampionStore";
import { useItemStore } from "../store/useItemStore";

const BASE_CRIT_CHANCE = 0.25;
const BASE_CRIT_DAMAGE = 1.5;
const ROUND_DURATION = 15; // seconds

type SimResult = {
  totalDamage: number;
  timeline: number[];
};

export function simulateDamage({
  attacker,
  target,
  items,
  targetItems,
}: {
  attacker: string;
  target: string;
  items: string[];
  targetItems: string[];
}): SimResult {
  const champions = useChampionStore.getState().champions;
  const allItems = useItemStore.getState().items;

  const atkChamp = champions.find((c) => c.name === attacker);
  const defChamp = champions.find((c) => c.name === target);

  if (!atkChamp || !defChamp) throw new Error("Champion not found");

  const getItemBonuses = (names: string[]) => {
    return names.reduce(
      (acc, name) => {
        const item = allItems.find((i) => i.name === name);
        if (!item) return acc;

        acc.ad += item.ad || 0;
        acc.as += item.as || 0;
        acc.hp += item.hp || 0;
        acc.armor += item.armor || 0;
        acc.mr += item.mr || 0;
        acc.critChance += item.critChance || 0;
        acc.critDamage += item.critDamage || 0;

        return acc;
      },
      {
        ad: 0,
        as: 0,
        hp: 0,
        armor: 0,
        mr: 0,
        critChance: 0,
        critDamage: 0,
      }
    );
  };

  const atkBonus = getItemBonuses(items);
  const defBonus = getItemBonuses(targetItems);

  // Final stat totals
  const finalAD = atkChamp.ad + atkBonus.ad;
  const finalAS = atkChamp.as + atkBonus.as;
  const critChance = Math.min(BASE_CRIT_CHANCE + atkBonus.critChance, 1);
  const critMult = BASE_CRIT_DAMAGE + atkBonus.critDamage;

  const finalHP = defChamp.hp + defBonus.hp;
  const finalArmor = defChamp.armor + defBonus.armor;

  const timeline: number[] = [];

  function calculateAutoAttackDamage(): number {
    let raw = finalAD;
    const isCrit = Math.random() < critChance;
    if (isCrit) raw *= critMult;

    const armorReduction = 100 / (100 + finalArmor); // standard TFT formula
    return raw * armorReduction;
  }

  for (let t = 0; t < ROUND_DURATION; t++) {
    const attacks = finalAS;
    let damageThisSecond = 0;

    for (let i = 0; i < attacks; i++) {
      damageThisSecond += calculateAutoAttackDamage();
    }

    timeline.push(damageThisSecond);
  }

  const totalDamage = timeline.reduce((sum, d) => sum + d, 0);
  return { totalDamage, timeline };
}
