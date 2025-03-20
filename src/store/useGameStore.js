import { create } from 'zustand';


const useGameStore = create((set) => ({
    roomId: '',
    myName: '',
    myIndex: '',
    myRole: '',
    numPlayers: 0,

    setRoomId: (roomId) => set({ roomId }),
    setMyName: (myName) => set({ myName }),
    setMyIndex: (myIndex) => set({myIndex}),
    setMyRole: (myRole) => set({myRole}),
    setNumPlayers: (numPlayers) => set({numPlayers}),
}))

export default useGameStore;