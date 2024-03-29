import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './use-app-dispatch';
import { addFavoritePlaceAction } from '../store/api-actions';
import { AuthorizationStatus, AppRoute } from '../const';
import { toast } from 'react-toastify';
import { Offer } from '../types/offer';

const useAddToFavorites = (authorizationStatus: AuthorizationStatus, offer: Offer | undefined) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFavoritesAdd = () => {
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

  return { handleFavoritesAdd };
};

export default useAddToFavorites;
