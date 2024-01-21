import CardItem from '../../components/card-item/card-item';
import { Offers } from '../../types/offer';
import { useState } from 'react';

type OffersListProps = {
  offers: Offers;
};

function OffersList(props: OffersListProps): JSX.Element {
  const { offers } = props;
  const [activeCard, setActiveCard] = useState({
    card: '0',
  });

  const hoverCardHandle = (id: string) => {
    setActiveCard({ ...activeCard, card: id });
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, id) => {
        const keyValue = `${id}-${offer.previewImage}`;
        return (
          <CardItem
            key={keyValue}
            offer={offer}
            onMouseOver={() => hoverCardHandle(keyValue)}
          />
        );
      })}
    </div>
  );
}

export default OffersList;
