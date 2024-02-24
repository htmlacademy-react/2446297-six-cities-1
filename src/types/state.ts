import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { Offer, Feedback, City } from './offer';
import { UserData } from './user-data';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type OffersData = {
  offers: Offer[];
  offersList: Offer[];
  isOffersDataLoading: boolean;
  room: Offer | null;
  isRoomDataLoading: boolean;
  nearByHotels: Offer[];
  isNearByHotelsDataLoading: boolean;
  comments: Feedback[];
  isCommentsDataLoading: boolean;
  isCommentDataPostingStatus: boolean;
};

export type OffersProcess = {
  city: City | null;
  offersList: Offer[];
  offers: Offer[];
};
