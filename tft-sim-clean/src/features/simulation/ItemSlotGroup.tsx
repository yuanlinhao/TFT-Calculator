import { useEffect } from "react";
import { useItemStore } from "../../store/useItemStore";

type Props = {
  selectedItems: string[];
  onSelect: (items: string[]) => void;
  label: string;
};

function ItemSlotGroup({ selectedItems, onSelect, label }: Props) {
  const { items, fetchItems } = useItemStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleChange = (index: number, value: string) => {
    const updated = [...selectedItems];
    updated[index] = value;
    onSelect(updated);
  };

  return (
    <div>
      <label className="block text-white mb-1">{label}</label>

      {selectedItems.map((selected, index) => {
        const matchedItem = items.find(
          (item) => item.name.toLowerCase() === selected.toLowerCase()
        );

        return (
          <div key={index} className="mb-2">
            <select
              value={selected}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
            >
              <option value="None">None</option>
              {items.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            {selected !== "None" && matchedItem?.iconUrl && (
              <img
                src={matchedItem.iconUrl}
                alt={matchedItem.name}
                className="w-8 h-8 mt-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ItemSlotGroup;
