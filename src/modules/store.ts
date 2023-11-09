import create from 'zustand';
import {persist} from 'zustand/middleware'
import { IDrewlingo, IStoreActions } from '../types/types';

const useDrewlingoStore = create<{ data: IDrewlingo } & IStoreActions>()(persist((set) => ({
  data: {
    points: 0,
    course: "regentish",
    lives: 3,
    progress: 0
  },
  updateData: (newData) => {
    set((s) => ({ data: { ...s.data, ...newData } }));
  },
}), {
  name: "app-data"
}));

export default useDrewlingoStore;