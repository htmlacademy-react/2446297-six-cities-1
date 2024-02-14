import {createAction} from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';

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

export const setError = createAction<string | null>('data/setError');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
