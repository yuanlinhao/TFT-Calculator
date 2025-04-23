import { useState } from "react";

type Props = {
  selectedItems: string[];
  onSelect: (items: string[]) => void;
};

const ITEM_OPTIONS = [
  { name: "None", icon: "" },
  { name: "Infinity Edge", icon: "/items/infinity-edge.png" },
  { name: "Guinsoo's Rageblade", icon: "/items/guinsoos-rageblade.png" },
  { name: "Deathblade", icon: "/items/deathblade.png" },
  { name: "Bloodthirster", icon: "/items/bloodthirster.png" },
  { name: "Giant Slayer", icon: "/items/giant-slayer.png" },
];

function ItemSelect({ selectedItems, onSelect }: Props) {
  const [internal, setInternal] = useState<string[]>(
    selectedItems.length === 3 ? selectedItems : ["None", "None", "None"]
  );

  const handleChange = (index: number, newValue: string) => {
    const updated = [...internal];
    updated[index] = newValue;
    setInternal(updated);
    onSelect(updated);
  };

  return (
    <div>
      <label className="block text-white mb-2">Items</label>
      <div className="grid grid-cols-1 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative">
            <select
              value={internal[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-full p-2 pl-10 rounded bg-gray-800 text-white border border-gray-600 appearance-none"
            >
              {ITEM_OPTIONS.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {ITEM_OPTIONS.find((it) => it.name === internal[i])?.icon && (
              <img
                src={ITEM_OPTIONS.find((it) => it.name === internal[i])!.icon}
                alt=""
                className="w-6 h-6 absolute top-2 left-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemSelect;
