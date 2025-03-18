import { create } from 'zustand';


const useGameStore = create((set) => ({
    roles: { '마피아': 1, '경찰': 1, '의사': 0, '시민': 0 },
    roomId: '',
    myName: '',
    myIndex: '',
    numPlayers: 0,

    setRoles: (roles) => set({ roles }),
    setRoomId: (roomId) => set({ roomId }),
    setMyName: (myName) => set({ myName }),
    setMyIndex: (myIndex) => set({myIndex}),
    setNumPlayers: (numPlayers) => set({numPlayers}),
}))

export default useGameStore;