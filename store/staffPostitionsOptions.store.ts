import { create } from "zustand";
import { TStaffPositionOptions } from "@/app/(ControPanel)/organitations/settings/_config/dto/staffType.type";

interface StaffPositionOptionsState {
  positionOptions: TStaffPositionOptions[];
  setStaffPositionsOptions: (options: TStaffPositionOptions[]) => void;
}

export const useStaffPositionOptionsStore = create<StaffPositionOptionsState>(
  (set) => ({
    positionOptions: [],
    setStaffPositionsOptions: (options) => set({ positionOptions: options }),
  }),
);
