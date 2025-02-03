import { create } from "zustand";

interface SearchStoreState {
  query: string;
  setQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
}

export const useSearchStore = create<SearchStoreState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  location: "",
  setLocation: (location) => set({ location }),
}));
