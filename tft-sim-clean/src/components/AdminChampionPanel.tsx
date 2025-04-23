// components/AdminChampionPanel.tsx
import { useEffect, useState } from "react";
import { useChampionStore, Champion } from "../store/useChampionStore";
import { api } from "../api/clients";

export default function AdminChampionPanel() {
  const { champions, fetchChampions, deleteChampion, updateChampion } = useChampionStore();
  const [editing, setEditing] = useState<Record<number, Partial<Champion>>>({});

  useEffect(() => {
    fetchChampions();
  }, [fetchChampions]);

  const handleChange = (id: number, field: keyof Champion, value: string | number) => {
    setEditing((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const saveChampion = async (id: number) => {
    try {
      if (editing[id]) {
        await updateChampion(id, editing[id]);
        setEditing((prev) => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Failed to save champion:", e.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this champion?")) {
      await deleteChampion(id);
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded text-white mt-6">
      <h2 className="text-lg font-bold mb-2">🏹 Champions</h2>
      <table className="w-full text-sm border-collapse">
        <thead className="border-b border-zinc-600">
          <tr>
            <th>Name</th>
            <th>Icon</th>
            <th>AD</th>
            <th>AS</th>
            <th>HP</th>
            <th>Armor</th>
            <th>MR</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {champions.map((champ) => {
            const edited = editing[champ.id] || {};
            return (
              <tr key={champ.id} className="border-b border-zinc-700">
                {(["name", "iconUrl", "ad", "as", "hp", "armor", "mr"] as const).map((key) => (
                  <td key={key}>
                    <input
                      defaultValue={champ[key]}
                      onChange={(e) =>
                        handleChange(
                          champ.id,
                          key,
                          key === "name" || key === "iconUrl" ? e.target.value : +e.target.value
                        )
                      }
                      className="bg-zinc-900 w-full px-1"
                    />
                  </td>
                ))}
                <td className="space-x-2">
                  <button
                    onClick={() => saveChampion(champ.id)}
                    className="bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(champ.id)}
                    className="bg-red-600 hover:bg-red-500 px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
