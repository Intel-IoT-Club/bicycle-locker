import { create } from 'zustand';

export const useWalletStore = create((set) => ({
    balance: 100, // Starting with ₹100

    recharge: (amount) =>
        set((state) => ({ balance: state.balance + amount })),

    deduct: (amount) =>
        set((state) => {
            if (state.balance >= amount) {
                return { balance: state.balance - amount };
            } else {
                return state; // Insufficient balance, no deduction
            }
        }),

    setDue: () => set(() => ({ balance: -1 })), // Negative value indicates DUE
}));
