import { create } from "zustand";
import { Status } from "@prisma/client";

type StatusStore = {
    status: Status;
    setStatus: (status: Status) => void;
};

export const useStatus = create<StatusStore>((set, get) => ({
    status: "" as Status,
    setStatus: (status: Status) => set({ status }),
}));
