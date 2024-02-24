import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersProcess} from '../../types/state';
import { City } from '../../types/offer';

const initialState: OffersProcess = {
  city: null,
  offersList: [],
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
    //setOffersList: (state, action: PayloadAction<{city: City}>) => {
    // const {city} = action.payload;
    // state.offersList = state.offers.filter((offer) => offer.city.name === city.name);
    //},
  },
});

export const {changeCity} = offersProcess.actions;
