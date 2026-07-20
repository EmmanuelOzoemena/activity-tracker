import { create } from "zustand";
import { RegistrationState } from "../types/form";

const initialParent = {
  parentName: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
};

export const useRegistrationStore = create<RegistrationState>((set, get) => ({
  parent: initialParent,
  children: [
    { id: "1", fullName: "", age: 6, gender: "male", selectedActivities: [] },
  ],
  paymentProof: null,

  setParentInfo: (info) =>
    set((state) => ({ parent: { ...state.parent, ...info } })),

  addChild: () =>
    set((state) => ({
      children: [
        ...state.children,
        {
          id: Date.now().toString(),
          fullName: "",
          age: 6,
          gender: "male",
          selectedActivities: [],
        },
      ],
    })),

  removeChild: (id) =>
    set((state) => ({
      children: state.children.filter((child) => child.id !== id),
    })),

  updateChild: (id, updatedFields) =>
    set((state) => ({
      children: state.children.map((child) =>
        child.id === id ? { ...child, ...updatedFields } : child,
      ),
    })),

  setPaymentProof: (file) => set({ paymentProof: file }),

  resetForm: () =>
    set({ parent: initialParent, children: [], paymentProof: null }),

  calculateTotalFee: () => {
    const { children } = get();
    return children.reduce((acc, child) => {
      // Fee based on flyer: Below 5 years: 30k | 6 years and above: 10k
      const fee = child.age < 6 ? 30000 : 10000;
      return acc + fee;
    }, 0);
  },
}));
