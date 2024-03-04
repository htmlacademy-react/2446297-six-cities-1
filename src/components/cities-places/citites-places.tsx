import { useEffect, useState, useCallback, useMemo } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import Map from '../../components/map/map';
import { City, Offer } from '../../types/offer';

type CititesPlacesProps = {
  city: City;
  offers: Offer[];
};

function CititesPlaces({city, offers}: CititesPlacesProps): JSX.Element {
  const classes = {
    article: 'cities__card',
    img: 'cities__image-wrapper',
    info: ''
  };

  const [sortingOption, setSortingOption] = useState('Popular');

  useEffect(() => {
    setSortingOption('Popular');
  }, [city]);

  const [activeCard, setActiveCard] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

  const handleCardHover = useCallback((offer: Offer) => {
    const {location} = offer;
    setActiveCard(location);
  }, []);

  const points = offers.map((offerItem) => offerItem.location);

  const sortedOffersList = useMemo(() => {
    switch(sortingOption) {
      case 'Price: low to high':
        return [...offers].sort((a: Offer, b: Offer) => a.price - b.price);
      case 'Price: high to low':
        return [...offers].sort((a: Offer, b: Offer) => b.price - a.price);
      case 'Top rated first':
        return [...offers].sort((a: Offer, b: Offer) => b.rating - a.rating);
      default:
        return offers;
    }
  }, [sortingOption, offers]);

  const handleSortOptionChange = useCallback((option: string) => {
    setSortingOption(option);
  }, []);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city && city.name}</b>
          <SortingOptions
            city={city}
            sortingOption = {sortingOption}
            onOptionChange={handleSortOptionChange}
          />
          <div className="cities__places-list places__list tabs__content">
            <OffersList offers={ sortedOffersList } className={classes} onMouseOver={handleCardHover}/>
          </div>
        </section>
        <div className="cities__right-section">
          {city &&
                <Map city={city}
                  points={Array.from(points)}
                  selectedPoint={activeCard}
                  className="cities__map"
                />}
        </div>
      </div>
    </div>
  );
}

export default CititesPlaces;
