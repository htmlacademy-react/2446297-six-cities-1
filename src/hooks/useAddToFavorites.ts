import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './useAppDispatch';
import { addFavoritePlaceAction } from '../store/api-actions';
import { AuthorizationStatus, AppRoute } from '../const';
import { toast } from 'react-toastify';
import { Offer } from '../types/offer';

const useAddToFavorites = (authorizationStatus: AuthorizationStatus, offer: Offer | undefined) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addToFavoritesHandler = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
      return;
    }

    if (offer) {
      dispatch(addFavoritePlaceAction({ hotelId: offer.id, status: !offer.isFavorite }))
        .catch(() => {
          toast.error('Error adding/removing favorite place');
        });
    }
  };

  return { addToFavoritesHandler };
};

export default useAddToFavorites;
