import {createReducer} from '@reduxjs/toolkit';
import {changeCity, setOffersList, setSortedOffersList, loadOffers, setOffersDataLoadingStatus, requireAuthorization, setUserInfo, loadRoom} from './action';
import { Offer, City } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data.js';

interface State {
  city: City | null;
  offersList: Offer[];
  offers: Offer[];
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  room: Offer | null;
}

const initialState: State = {
  city: null,
  offersList: [],
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  room: null,
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
    .addCase(loadRoom, (state, action) => {
      state.room = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.user = action.payload;
    });
});

export {reducer};
