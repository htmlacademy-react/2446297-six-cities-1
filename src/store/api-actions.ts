import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, Feedback } from '../types/offer';
import { redirectToRoute } from './action';
import { setUserInfo } from './user-process/user-process';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { resetFavoritePlaces } from './offers-data/offers-data';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchHotels',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchRoomAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRoom',
  async (hotelId, {extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${hotelId}`);
    return data;
  },
);

export const fetchNearByHotelsAction = createAsyncThunk<Offer[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearByHotels',
  async (hotelId, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${hotelId}/nearby`);
    return data;
  },
);

export const fetchFavoritePlacesAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoritePlaces',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.FavoritePlaces);
    return data;
  },
);

export const addFavoritePlaceAction = createAsyncThunk<Offer, { hotelId: number; status: boolean }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addFavoritePlace',
  async ({hotelId, status}, {extra: api}) => {
    const statusNumber = status ? 1 : 0;
    const {data} = await api.post<Offer>(`${APIRoute.FavoritePlaces}/${hotelId}/${statusNumber}`);
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Feedback[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (hotelId, {extra: api}) => {
    const {data} = await api.get<Feedback[]>(`${APIRoute.Comments}/${hotelId}`);
    return data;
  },
);

export const addCommentAction = createAsyncThunk<Feedback[], { hotelId: number; feedback: {comment: string; rating: number} }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addComment',
  async ({hotelId, feedback: {comment, rating}}, {extra: api}) => {
    const {data} = await api.post<Feedback[]>(`${APIRoute.Comments}/${hotelId}`, {comment, rating});
    return data;
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUserInfo({user: data}));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(resetFavoritePlaces());
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(setUserInfo({user: data}));
  },
);
