import {createReducer} from '@reduxjs/toolkit';
import {changeCity, setOffersList, setSortedOffersList, loadOffers, setOffersDataLoadingStatus, setNearByHotelsDataLoadingStatus, setCommentDataPostingStatus, requireAuthorization, setUserInfo, loadRoom, setRoomDataLoadingStatus, loadNearByHotels, loadComments, setCommentsDataLoadingStatus} from './action';
import { Offer, City, Feedback } from '../types/offer';
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
  isRoomDataLoading: boolean;
  nearByHotels: Offer[];
  isNearByHotelsDataLoading: boolean;
  comments: Feedback[];
  isCommentsDataLoading: boolean;
  isCommentDataPostingStatus: boolean;
}

const initialState: State = {
  city: null,
  offersList: [],
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  room: null,
  isRoomDataLoading: true,
  isNearByHotelsDataLoading: true,
  nearByHotels: [],
  comments: [],
  isCommentsDataLoading: true,
  isCommentDataPostingStatus: false,
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
      if (state.room?.id !== action.payload.id) {
        state.room = action.payload;
      }
    })
    .addCase(loadNearByHotels, (state, action) => {
      state.nearByHotels = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload.sort((a, b) => b.id - a.id );
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setNearByHotelsDataLoadingStatus, (state, action) => {
      state.isNearByHotelsDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setRoomDataLoadingStatus, (state, action) => {
      state.isRoomDataLoading = action.payload;
    })
    .addCase(setCommentsDataLoadingStatus, (state, action) => {
      state.isCommentsDataLoading = action.payload;
    })
    .addCase(setCommentDataPostingStatus, (state, action) => {
      state.isCommentDataPostingStatus = action.payload;
    });
});

export {reducer};
