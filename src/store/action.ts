import {createAction} from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';

export const changeCity = createAction('offers/changeCity', (value: City) => ({
  payload: value,
}));

export const getOffersList = createAction('offers/getOffersList', (value: City) => ({
  payload: value,
}));

export const sortOffersList = createAction('offers/sortOffersList', (value: Offer[]) => ({
  payload: value,
}));
