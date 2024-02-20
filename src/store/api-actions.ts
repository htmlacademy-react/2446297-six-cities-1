import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Offer, Feedback } from '../types/offer.js';
import { loadOffers, setOffersDataLoadingStatus, requireAuthorization, redirectToRoute, setUserInfo, loadRoom, setRoomDataLoadingStatus, setCommentDataPostingStatus, setCommentsDataLoadingStatus, setNearByHotelsDataLoadingStatus, loadNearByHotels, loadComments } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchHotels',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchRoomAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRoom',
  async (hotelId, {dispatch, extra: api}) => {
    dispatch(setRoomDataLoadingStatus(true));
    if (hotelId) {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${hotelId}`);
      dispatch(setRoomDataLoadingStatus(false));
      dispatch(loadRoom(data));
    }
  },
);

export const fetchNearByHotelsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearByHotels',
  async (hotelId, {dispatch, extra: api}) => {
    dispatch(setNearByHotelsDataLoadingStatus(true));
    if (hotelId) {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${hotelId}/nearby`);
      dispatch(setNearByHotelsDataLoadingStatus(false));
      dispatch(loadNearByHotels(data));
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (hotelId, {dispatch, extra: api}) => {
    if (hotelId) {
      dispatch(setCommentsDataLoadingStatus(true));
      const {data} = await api.get<Feedback[]>(`${APIRoute.Comments}/${hotelId}`);
      dispatch(setCommentsDataLoadingStatus(false));
      dispatch(loadComments(data));
    }
  },
);

export const addCommentAction = createAsyncThunk<void, { hotelId: number | null; feedback: {comment: string; rating: number} }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addComment',
  async ({hotelId, feedback: {comment, rating}}, {dispatch, extra: api}) => {
    if (hotelId) {
      dispatch(setCommentDataPostingStatus(true));
      const {data} = await api.post<Feedback[]>(`${APIRoute.Comments}/${hotelId}`, {comment, rating});
      dispatch(setCommentDataPostingStatus(false));
      dispatch(loadComments(data));
    }
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
    dispatch(setUserInfo(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserInfo(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
