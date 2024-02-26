import OffersList from '../offers-list/offers-list';
import { Offer } from '../../types/offer';

type NearPlacesProps = {
  nearestRooms: Offer[];
}

function NearPlaces({nearestRooms}: NearPlacesProps): JSX.Element {
  const classes = {
    article: 'near-places__card',
    img: 'near-places__image-wrapper',
    info: '',
    isPremiumBlockShow: false
  };

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OffersList offers={ nearestRooms } className={classes}/>
      </div>
    </section>
  );
}

export default NearPlaces;
