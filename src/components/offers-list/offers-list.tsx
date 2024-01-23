import CardItem from '../../components/card-item/card-item';
import { Offer } from '../../types/offer';


type OffersListProps = {
  offers: Offer[];
  onMouseOver?: (offerId: Offer) => void;
  className: {
    article: string;
    img: string;
    info: string;
    imgHeight?: string;
    imgWidth?: string;
  };
};

function OffersList(props: OffersListProps): JSX.Element {
  const { offers, className, onMouseOver } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => {
        const keyValue = offer.id;
        return (
          <CardItem
            key={keyValue}
            offer={offer}
            onMouseOver={() => onMouseOver && onMouseOver(offer)}
            className={className}
          />
        );
      })}
    </div>
  );
}

export default OffersList;
