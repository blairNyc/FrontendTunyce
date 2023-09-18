// walletSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  totalBalance: number;
  totalDeposited: number;
  totalPaid: number;
}

const initialState: WalletState = {
  totalBalance: 25000.0,
  totalDeposited: 19000.0,
  totalPaid: 16000.0,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateTotalBalance: (state, action: PayloadAction<number>) => {
      state.totalBalance = action.payload;
    },
    updateTotalDeposited: (state, action: PayloadAction<number>) => {
      state.totalDeposited = action.payload;
    },
    updateTotalPaid: (state, action: PayloadAction<number>) => {
      state.totalPaid = action.payload;
    },
  },
});

export const { updateTotalBalance, updateTotalDeposited, updateTotalPaid } =
  walletSlice.actions;

export default walletSlice.reducer;
