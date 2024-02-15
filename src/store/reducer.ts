import {createReducer} from '@reduxjs/toolkit';
import {changeCity, setOffersList, setSortedOffersList, loadOffers, setError, setOffersDataLoadingStatus} from './action';
import { Offer, City } from '../types/offer';

interface State {
  city: City | null;
  offersList: Offer[];
  offers: Offer[];
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: State = {
  city: null,
  offersList: [],
  offers: [],
  error: null,
  isOffersDataLoading: false
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
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export {reducer};
