import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersProcess} from '../../types/state';
import { City } from '../../types/offer';

const initialState: OffersProcess = {
  city: null,
  offers: [],
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{city: City}>) => {
      const {city} = action.payload;
      state.city = city;
    },
  },
});

export const {changeCity} = offersProcess.actions;
