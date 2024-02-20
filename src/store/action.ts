import {createAction} from '@reduxjs/toolkit';
import { City, Offer, Feedback } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../const';
import { UserData } from '../types/user-data.js';

export const changeCity = createAction('offers/changeCity', (value: City) => ({
  payload: value,
}));

export const setOffersList = createAction('offers/setOffersList', (value: City) => ({
  payload: value,
}));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadRoom = createAction<Offer>('data/loadRoom');

export const loadNearByHotels = createAction<Offer[]>('data/loadNearByHotels');

export const loadComments = createAction<Feedback[]>('data/loadComments');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setRoomDataLoadingStatus = createAction<boolean>('data/setRoomDataLoadingStatus');

export const setNearByHotelsDataLoadingStatus = createAction<boolean>('data/setNearByHotelsDataLoadingStatus');

export const setCommentsDataLoadingStatus = createAction<boolean>('data/setCommentsDataLoadingStatus');

export const setCommentDataPostingStatus = createAction<boolean>('data/setCommentDataPostingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserInfo = createAction<UserData>('user/setUserInfo');

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
