import {createAction} from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../const';
import { UserData } from '../types/user-data.js';

export const changeCity = createAction('offers/changeCity', (value: City) => ({
  payload: value,
}));

export const setOffersList = createAction('offers/setOffersList', (value: City) => ({
  payload: value,
}));

export const setSortedOffersList = createAction('offers/setSortedOffersList', (value: Offer[]) => ({
  payload: value,
}));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadRoom = createAction<Offer>('data/loadRoom');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserInfo = createAction<UserData>('user/setUserInfo');

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
