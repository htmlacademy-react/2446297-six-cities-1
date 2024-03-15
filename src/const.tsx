import { City } from './types/offer';

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Room = '/offer/:id'
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  FavoritePlaces = '/favorite',
}

export enum NameSpace {
  Data = 'DATA',
  Offers = 'OFFERS',
  User = 'USER',
}

export enum CommentLength {
  Min = 50,
  Max = 300,
}

export const SORT_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export const RATING_VALUES = [{mark: 5, text: 'perfect'}, {mark: 4, text: 'good'}, {mark: 3, text: 'not bad'}, {mark: 2, text: 'badly'}, {mark: 1, text: 'terribly'}];

export const CITIES: City[] = [
  {
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    },
    name: 'Paris',
  },
  {
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 10
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    },
    name: 'Dusseldorf',
  },
];

export enum UrlMarkers {
  UrlMarkerDefault = 'img/pin.svg',
  UrlMarkerCurrent = 'img/pin-active.svg',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_COUNT_COMMENTS = 10;

export const MAX_COUNT_NEARBY = 3;

export const MAX_COUNT_PHOTOS = 6;
