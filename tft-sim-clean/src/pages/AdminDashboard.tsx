import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { api } from "../api/clients";
import AdminItemPanel from "../components/AdminItemPanel";
import AdminChampionPanel from "../components/AdminChampionPanel";

type User = {
  id: number;
  username: string;
  isAdmin: boolean;
};

type Champion = {
  name: string;
  iconUrl: string;
  ad: number;
  as: number;
  hp: number;
  armor: number;
  mr: number;
};

type Item = {
  name: string;
  iconUrl: string;
  ad?: number;
  as?: number;
  critChance?: number;
  critDamage?: number;
  hp?: number;
  armor?: number;
  mr?: number;
};

function AdminDashboard() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [champion, setChampion] = useState<Champion>({
    name: "",
    iconUrl: "",
    ad: 0,
    as: 0,
    hp: 0,
    armor: 0,
    mr: 0,
  });

  const [item, setItem] = useState<Item>({
    name: "",
    iconUrl: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/admin/users/${id}`, { withCredentials: true });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const addChampion = async () => {
    try {
      await api.post("/admin/champions", champion, { withCredentials: true });
      alert("Champion added!");
      setChampion({ name: "", iconUrl: "", ad: 0, as: 0, hp: 0, armor: 0, mr: 0 });
    } catch (err) {
      console.error("Champion create failed", err);
    }
  };

  const addItem = async () => {
    try {
      await api.post("/admin/items", item, { withCredentials: true });
      alert("Item added!");
      setItem({ name: "", iconUrl: "" });
    } catch (err) {
      console.error("Item create failed", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!user?.isAdmin) return <div className="p-6 text-red-400">Forbidden</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* User List */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="space-y-1">
          {users.map((u) => (
            <li key={u.id} className="flex justify-between items-center">
              <span>
                {u.username} {u.isAdmin && <strong>(admin)</strong>}
              </span>
              <button
                onClick={() => deleteUser(u.id)}
                className="text-sm bg-red-600 hover:bg-red-500 px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Champion Form */}
      <section>
  <h2 className="text-xl font-semibold mb-2">Add Champion</h2>
  <div className="grid grid-cols-2 gap-2 max-w-lg">
    {(
      [
        ["Name", "name"],
        ["Icon URL", "iconUrl"],
        ["AD", "ad"],
        ["AS", "as"],
        ["HP", "hp"],
        ["Armor", "armor"],
        ["MR", "mr"],
      ] as [string, keyof Champion][]
    ).map(([label, key]) => (
      <div key={key} className="flex flex-col">
        <label className="text-sm text-gray-300 mb-1">{label}</label>
        <input
          type={typeof champion[key] === "number" ? "number" : "text"}
          placeholder={label}
          className="p-2 bg-zinc-700 rounded text-white"
          value={champion[key]}
          onChange={(e) =>
            setChampion({
              ...champion,
              [key]: typeof champion[key] === "number" ? +e.target.value : e.target.value,
            })
          }
        />
      </div>
    ))}
  </div>
  <button onClick={addChampion} className="mt-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
    Add Champion
  </button>
</section>

      {/* Item Form */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Add Item</h2>
        <div className="grid grid-cols-2 gap-2 max-w-lg">
          {["name", "iconUrl", "ad", "as", "critChance", "critDamage"].map((key) => (
            <input
              key={key}
              type={["ad", "as", "critChance", "critDamage", "mr"].includes(key) ? "number" : "text"}
              placeholder={key}
              className="p-2 bg-zinc-700 rounded text-white"
              value={item[key as keyof Item] ?? ""}
              onChange={(e) =>
                setItem({
                  ...item,
                  [key]: ["ad", "as", "critChance", "critDamage"].includes(key)
                    ? +e.target.value
                    : e.target.value,
                })
              }
            />
          ))}
        </div>
        <button onClick={addItem} className="mt-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
          Add Item
        </button>
      </section>

      {/* Champion Editor */}
      <section>
        <h2 className="text-xl font-semibold mb-2 mt-10">Manage Champions</h2>
        <AdminChampionPanel />
      </section>

      {/* Item Editor */}
      <section>
        <h2 className="text-xl font-semibold mb-2 mt-10">Manage Items</h2>
        <AdminItemPanel />
      </section>

    </div>
  );
}

export default AdminDashboard;
