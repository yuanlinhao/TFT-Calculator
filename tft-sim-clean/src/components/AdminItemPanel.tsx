import { useEffect, useState } from "react";
import { useItemStore, Item } from "../store/useItemStore";

function AdminItemPanel() {
  const { items, fetchItems, addItem, updateItem, deleteItem } = useItemStore();
  const [newItem, setNewItem] = useState<Omit<Item, "id">>({
    name: "",
    iconUrl: "",
    ad: 0,
    as: 0,
    critChance: 0,
    critDamage: 0,
    hp: 0,
    armor: 0,
    mr: 0,
    specialEffect: "",
  });

  const [editing, setEditing] = useState<Record<number, Partial<Item>>>({});

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleChange = (id: number, field: keyof Item, value: Item[keyof Item]) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (id: number) => {
    if (editing[id]) {
      await updateItem(id, editing[id]);
      setEditing((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteItem(id);
    }
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.iconUrl) return alert("Name and icon are required");
    await addItem(newItem);
    setNewItem({
      name: "",
      iconUrl: "",
      ad: 0,
      as: 0,
      critChance: 0,
      critDamage: 0,
      hp: 0,
      armor: 0,
      mr: 0,
      specialEffect: "",
    });
  };

  return (
    <div className="bg-zinc-800 p-4 rounded text-white mt-6">
      <h2 className="text-lg font-bold mb-2">🛡️ Items</h2>
      <table className="w-full text-sm">
        <thead className="border-b border-zinc-600">
          <tr>
            <th>Name</th>
            <th>Icon</th>
            <th>AD</th>
            <th>AS</th>
            <th>Crit%</th>
            <th>CritDmg</th>
            <th>HP</th>
            <th>Armor</th>
            <th>MR</th>
            <th>Effect</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id} className="border-b border-zinc-700">
                <td>
                  <input
                    className="bg-zinc-900 px-1 w-full"
                    defaultValue={item.name}
                    onChange={(e) => handleChange(item.id, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="bg-zinc-900 px-1 w-full"
                    defaultValue={item.iconUrl}
                    onChange={(e) => handleChange(item.id, "iconUrl", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bg-zinc-900 px-1 w-14"
                    defaultValue={item.ad || 0}
                    onChange={(e) => handleChange(item.id, "ad", Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bg-zinc-900 px-1 w-14"
                    defaultValue={item.as || 0}
                    onChange={(e) => handleChange(item.id, "as", Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bg-zinc-900 px-1 w-14"
                    defaultValue={item.critChance || 0}
                    onChange={(e) => handleChange(item.id, "critChance", Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bg-zinc-900 px-1 w-14"
                    defaultValue={item.critDamage || 0}
                    onChange={(e) => handleChange(item.id, "critDamage", Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bg-zinc-900 px-1 w-14"
                    defaultValue={item.hp || 0}
                    onChange={(e) => handleChange(item.id, "hp", Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bg-zinc-900 px-1 w-14"
                    defaultValue={item.armor || 0}
                    onChange={(e) => handleChange(item.id, "armor", Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bg-zinc-900 px-1 w-14"
                    defaultValue={item.mr || 0}
                    onChange={(e) => handleChange(item.id, "mr", Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    className="bg-zinc-900 px-1 w-full"
                    defaultValue={item.specialEffect || ""}
                    onChange={(e) => handleChange(item.id, "specialEffect", e.target.value)}
                  />
                </td>
                <td className="space-x-1">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}

          <tr className="border-t border-zinc-700">
            <td>
              <input
                className="bg-zinc-900 px-1 w-full"
                placeholder="Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </td>
            <td>
              <input
                className="bg-zinc-900 px-1 w-full"
                placeholder="Icon URL"
                value={newItem.iconUrl}
                onChange={(e) => setNewItem({ ...newItem, iconUrl: e.target.value })}
              />
            </td>
            <td>
              <input
                type="number"
                className="bg-zinc-900 px-1 w-14"
                value={newItem.ad || 0}
                onChange={(e) => setNewItem({ ...newItem, ad: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                className="bg-zinc-900 px-1 w-14"
                value={newItem.as || 0}
                onChange={(e) => setNewItem({ ...newItem, as: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                className="bg-zinc-900 px-1 w-14"
                value={newItem.critChance || 0}
                onChange={(e) => setNewItem({ ...newItem, critChance: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                className="bg-zinc-900 px-1 w-14"
                value={newItem.critDamage || 0}
                onChange={(e) => setNewItem({ ...newItem, critDamage: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                className="bg-zinc-900 px-1 w-14"
                value={newItem.hp || 0}
                onChange={(e) => setNewItem({ ...newItem, hp: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                className="bg-zinc-900 px-1 w-14"
                value={newItem.armor || 0}
                onChange={(e) => setNewItem({ ...newItem, armor: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                className="bg-zinc-900 px-1 w-14"
                value={newItem.mr || 0}
                onChange={(e) => setNewItem({ ...newItem, mr: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                className="bg-zinc-900 px-1 w-full"
                placeholder="Special effect"
                value={newItem.specialEffect || ""}
                onChange={(e) => setNewItem({ ...newItem, specialEffect: e.target.value })}
              />
            </td>
            <td>
              <button
                onClick={handleAdd}
                className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded text-xs"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminItemPanel;
