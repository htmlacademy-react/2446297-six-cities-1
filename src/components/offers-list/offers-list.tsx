import CardItem from '../../components/card-item/card-item';
import { Offer } from '../../types/offer';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
  className: {
    article: string;
    img: string;
    info: string;
    imgHeight?: string;
    imgWidth?: string;
  };
};

function OffersList(props: OffersListProps): JSX.Element {
  const { offers, className } = props;
  const [activeCard, setActiveCard] = useState({
    card: 0,
  });

  const hoverCardHandle = (id: number) => {
    setActiveCard({ ...activeCard, card: id });
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => {
        const keyValue = offer.id;
        return (
          <CardItem
            key={keyValue}
            offer={offer}
            onMouseOver={() => hoverCardHandle(keyValue)}
            className={className}
          />
        );
      })}
    </div>
  );
}

export default OffersList;
