import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { fetchOffersAction, fetchCommentsAction, fetchNearByHotelsAction, fetchRoomAction, addCommentAction, fetchFavoritePlacesAction, addFavoritePlaceAction } from '../api-actions';
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
  isFavoritePlacesDataLoading: true,
  isCommentDataPostingStatus: false,
  hasError: false,
  hasFavoritePlaceError: false,
  favoritePlaces: [],
  isFavoritePlacePostingStatus: false,
  hasRoomError: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState: initialState,
  reducers: {
    setOffersList: (state, action: PayloadAction<{city: City}>) => {
      const {city} = action.payload;
      state.offersList = state.offers.filter((offer) => offer.city.name === city.name);
    },
    setFavoritePlacesList: (state, action: PayloadAction<{city: City}>) => {
      const {city} = action.payload;
      state.favoritePlaces = state.favoritePlaces.filter((offer) => offer.city.name === city.name && offer.isFavorite);
    },
    resetFavoritePlaces: (state) => {
      state.favoritePlaces = [];
      state.offers.forEach((offer) => {
        offer.isFavorite = false;
      });
      state.offersList.forEach((offer) => {
        offer.isFavorite = false;
      });
      state.nearByHotels.forEach((offer) => {
        offer.isFavorite = false;
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchNearByHotelsAction.pending, (state) => {
        state.isNearByHotelsDataLoading = true;
      })
      .addCase(fetchNearByHotelsAction.fulfilled, (state, action) => {
        state.nearByHotels = action.payload;
        state.isNearByHotelsDataLoading = false;
      })
      .addCase(fetchNearByHotelsAction.rejected, (state) => {
        state.isNearByHotelsDataLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsDataLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        state.isCommentsDataLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentsDataLoading = false;
      })
      .addCase(fetchRoomAction.pending, (state) => {
        state.isRoomDataLoading = true;
      })
      .addCase(fetchRoomAction.fulfilled, (state, action) => {
        state.room = action.payload;
        state.isRoomDataLoading = false;
      })
      .addCase(fetchRoomAction.rejected, (state) => {
        state.isRoomDataLoading = false;
        state.hasRoomError = true;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.isCommentDataPostingStatus = true;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        state.isCommentDataPostingStatus = false;
      })
      .addCase(fetchFavoritePlacesAction.pending, (state) => {
        state.isFavoritePlacesDataLoading = true;
      })
      .addCase(fetchFavoritePlacesAction.fulfilled, (state, action) => {
        state.favoritePlaces = action.payload;
        state.isFavoritePlacesDataLoading = false;
      })
      .addCase(fetchFavoritePlacesAction.rejected, (state) => {
        state.isFavoritePlacesDataLoading = false;
        state.hasFavoritePlaceError = true;
      })
      .addCase(addFavoritePlaceAction.pending, (state) => {
        state.isFavoritePlacePostingStatus = true;
      })
      .addCase(addFavoritePlaceAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (state.room?.id === updatedOffer.id) {
          state.room.isFavorite = updatedOffer.isFavorite;
        }
        if (!updatedOffer.isFavorite) {
          state.favoritePlaces = state.favoritePlaces.filter((offer) => offer.id !== updatedOffer.id);
        }
        else {
          state.favoritePlaces.push(updatedOffer);
        }
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.offersList = state.offersList.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.nearByHotels = state.nearByHotels.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.isFavoritePlacePostingStatus = false;
      });
  }
});

export const {setOffersList, resetFavoritePlaces} = offersData.actions;
