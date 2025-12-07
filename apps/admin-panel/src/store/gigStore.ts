import { create } from 'zustand';

interface GigStore {
  selectedGigId: string | null;
  setSelectedGigId: (id: string | null) => void;
}

export const useGigStore = create<GigStore>((set) => ({
  selectedGigId: null,
  setSelectedGigId: (id) => set({ selectedGigId: id }),
}));
