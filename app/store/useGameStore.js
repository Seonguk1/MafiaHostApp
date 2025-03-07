import { create } from 'zustand';

export const useGameStore = create((set) => ({
  players: [],
  roles: { '마피아': 1, '경찰': 1, '의사': 1, '시민': 0 },
  setPlayers: (players) => set({ players }),
  setRoles: (roles) => set({roles}),
}));
