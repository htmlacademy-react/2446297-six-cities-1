import {createReducer} from '@reduxjs/toolkit';
import {changeCity, setOffersList, setSortedOffersList} from './action';
import { Offer, City } from '../types/offer';
import { offers } from '../mocks/offers';

interface State {
  city: City | null;
  offersList: Offer[];
  offers: Offer[];
}

const initialState: State = {
  city: null,
  offersList: [],
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffersList, (state, action) => {
      state.offersList = state.offers.filter((offer) => offer.city.name === action.payload.name);
    })
    .addCase(setSortedOffersList, (state, action) => {
      state.offersList = action.payload;
    });

});

export {reducer};
