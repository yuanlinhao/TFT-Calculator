import { useEffect, useState } from "react";
import { useItemStore } from "../../store/useItemStore";
import ChampionSelect from "./ChampionSelect";
import ItemSlotGroup from "./ItemSlotGroup";
import TargetSelect from "./TargetSelect";
import ChampionStatsPanel from "../../components/ChampionStatsPanel";
import SimulateButton from "./SimulateButton";
import { useChampionStore } from "../../store/useChampionStore";

function SimulationPage() {
  const [attacker, setAttacker] = useState("Vayne");
  const [target, setTarget] = useState("Cho'Gath");
  const [items, setItems] = useState(["None", "None", "None"]);
  const [targetItems, setTargetItems] = useState(["None", "None", "None"]);
  const { fetchItems } = useItemStore();
  const { fetchChampions } = useChampionStore();

  useEffect(() => {
    fetchItems();
    fetchChampions();
  }, [fetchItems, fetchChampions]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">TFT Auto-Attack Simulator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <ChampionSelect selected={attacker} onSelect={setAttacker} />
          <ChampionStatsPanel role="attacker" championName={attacker} items={items} />
          <ItemSlotGroup selectedItems={items} onSelect={setItems} label="Attacker Items" />
        </div>
        <div className="space-y-4">
          <TargetSelect selected={target} onSelect={setTarget} />
          <ChampionStatsPanel role="target" championName={target} items={targetItems} />
          <ItemSlotGroup selectedItems={targetItems} onSelect={setTargetItems} label="Target Items" />
          <SimulateButton attacker={attacker} target={target} items={items} targetItems={targetItems} />
        </div>
      </div>
    </div>
  );
}

export default SimulationPage;
