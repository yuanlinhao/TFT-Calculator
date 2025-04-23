import { useChampionStore } from "../../store/useChampionStore";

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

function ChampionSelect({ selected, onSelect }: Props) {
  const { champions } = useChampionStore();

  return (
    <div>
      <label className="block text-white mb-1">Attacker Champion</label>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
      >
        {champions.map((champ) => (
          <option key={champ.id} value={champ.name}>
            {champ.name}
          </option>
        ))}
      </select>

      {/* Optional image */}
      {selected && (
        <img
          src={champions.find((c) => c.name === selected)?.iconUrl}
          alt={selected}
          className="w-16 mt-2"
        />
      )}
    </div>
  );
}

export default ChampionSelect;
