import { create } from 'zustand';
import axios from 'axios';

export type Item = {
  id: number;
  name: string;
  iconUrl: string;
  ad?: number;
  as?: number;
  critChance?: number;
  critDamage?: number;
  hp?: number;
  armor?: number;
  mr?: number;
  specialEffect?: string;
};

type ItemStore = {
  items: Item[];
  fetchItems: () => Promise<void>;
  addItem: (item: Omit<Item, 'id'>) => Promise<void>;
  updateItem: (id: number, data: Partial<Omit<Item, 'id'>>) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
};

export const useItemStore = create<ItemStore>((set) => ({
  items: [],

  fetchItems: async () => {
    try {
      const res = await axios.get<Item[]>('http://localhost:5041/api/items');
      set({ items: res.data });
    } catch (err) {
      console.error('Failed to fetch items:', err);
    }
  },

  addItem: async (item) => {
    try {
      const res = await axios.post<Item>('http://localhost:5041/api/admin/items', item, {
        withCredentials: true,
      });
      set((state) => ({ items: [...state.items, res.data] }));
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  },

  updateItem: async (id, data) => {
    try {
      const res = await axios.patch<Item>(`http://localhost:5041/api/admin/items/${id}`, data, {
        withCredentials: true,
      });
      set((state) => ({
        items: state.items.map((i) => (i.id === id ? res.data : i)),
      }));
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  },

  deleteItem: async (id) => {
    try {
      await axios.delete(`http://localhost:5041/api/admin/items/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  },
}));
