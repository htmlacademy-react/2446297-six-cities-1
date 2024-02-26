import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { fetchOffersAction, fetchCommentsAction, fetchNearByHotelsAction, fetchRoomAction, addCommentAction } from '../api-actions';
import { OffersData } from '../../types/state';
import { City } from '../../types/offer';

const initialState: OffersData = {
  offers: [],
  offersList: [],
  isOffersDataLoading: false,
  room: null,
  isRoomDataLoading: true,
  isNearByHotelsDataLoading: true,
  nearByHotels: [],
  comments: [],
  isCommentsDataLoading: true,
  isCommentDataPostingStatus: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState: initialState,
  reducers: {
    setOffersList: (state, action: PayloadAction<{city: City}>) => {
      const {city} = action.payload;
      state.offersList = state.offers.filter((offer) => offer.city.name === city.name);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchNearByHotelsAction.pending, (state) => {
        state.isNearByHotelsDataLoading = true;
      })
      .addCase(fetchNearByHotelsAction.fulfilled, (state, action) => {
        state.nearByHotels = action.payload;
        state.isNearByHotelsDataLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsDataLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        state.isCommentsDataLoading = false;
      })
      .addCase(fetchRoomAction.pending, (state) => {
        state.isRoomDataLoading = true;
      })
      .addCase(fetchRoomAction.fulfilled, (state, action) => {
        state.room = action.payload;
        state.isRoomDataLoading = false;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.isCommentDataPostingStatus = true;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        state.isCommentDataPostingStatus = false;
      });
  }
});

export const {setOffersList} = offersData.actions;
