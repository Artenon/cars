import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICar } from "@/types/car";

interface IState {
  cars: ICar[];
}

const initialState: IState = {
  cars: [],
};

export const dataSlice = createSlice({
  name: "DATA",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<ICar[]>) => {
      state.cars = action.payload;
    },
  },
});

export const { setCars } = dataSlice.actions;
