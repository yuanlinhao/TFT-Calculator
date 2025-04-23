import { create } from "zustand";
import { api } from "../api/clients";

export type Champion = {
  id: number;
  name: string;
  iconUrl: string;
  ad: number;
  as: number;
  hp: number;
  armor: number;
  mr: number;
};

type ChampionStore = {
  champions: Champion[];
  fetchChampions: () => Promise<void>;
  addChampion: (champion: Omit<Champion, "id">) => Promise<void>;
  updateChampion: (id: number, data: Partial<Omit<Champion, "id">>) => Promise<void>;
  deleteChampion: (id: number) => Promise<void>;
};

export const useChampionStore = create<ChampionStore>((set) => ({
  champions: [],

  fetchChampions: async () => {
    try {
      const res = await api.get<Champion[]>("/champions");
      set({ champions: res.data });
    } catch (err) {
      console.error("Failed to fetch champions:", err);
    }
  },

  addChampion: async (champion) => {
    try {
      const res = await api.post<Champion>("/admin/champions", champion, {
        withCredentials: true,
      });
      set((state) => ({ champions: [...state.champions, res.data] }));
    } catch (err) {
      console.error("Failed to add champion:", err);
    }
  },

  updateChampion: async (id, data) => {
    try {
      const res = await api.patch<Champion>(`/admin/champions/${id}`, data, {
        withCredentials: true,
      });
      set((state) => ({
        champions: state.champions.map((c) => (c.id === id ? res.data : c)),
      }));
    } catch (err) {
      console.error("Failed to update champion:", err);
    }
  },

  deleteChampion: async (id) => {
    try {
      await api.delete(`/admin/champions/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        champions: state.champions.filter((c) => c.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete champion:", err);
    }
  },
}));
