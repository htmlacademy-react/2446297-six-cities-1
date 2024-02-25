import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { Feedback, Offer } from '../../types/offer';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offersList;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getRoomDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isRoomDataLoading;
export const getNearByHotelsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isNearByHotelsDataLoading;
export const getCommentsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCommentsDataLoading;
export const getRoom = (state: State): Offer | null => state[NameSpace.Data].room;
export const getNearByHotels = (state: State): Offer[] => state[NameSpace.Data].nearByHotels;
export const getComments = (state: State): Feedback[] => state[NameSpace.Data].comments;
export const getCommentDataPostingStatus = (state: State): boolean => state[NameSpace.Data].isCommentDataPostingStatus;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;
export const getFavoritePlaces = (state: State): Offer[] => state[NameSpace.Data].favoritePlaces;
export const getFavouriteErrorStatus = (state: State): boolean => state[NameSpace.Data].hasFavoritePlaceError;
