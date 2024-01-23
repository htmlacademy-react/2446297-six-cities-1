export type Feedback = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
}

export type Offer = {
  id: number;
  isPremium: boolean;
  price: number;
  description: string;
  type: string;
  bedrooms: number;
  rating: number;
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    name: string;
  };
  goods: string[];
  host: {
      avatarUrl: string;
      id: number;
      isPro: boolean;
      name: string;
  };
  images: string[];
  isFavorite: boolean;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  maxAdults: number;
  previewImage: string;
  title: string;
}
