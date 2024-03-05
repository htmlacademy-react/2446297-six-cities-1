import CardItem from '../../components/card-item/card-item';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  onMouseOver?: (offerId: Offer) => void;
  onMouseOut?: () => void;
  className: {
    article: string;
    img: string;
    info: string;
    imgHeight?: string;
    imgWidth?: string;
  };
};

function OffersList(props: OffersListProps): JSX.Element {
  const { offers, className, onMouseOver, onMouseOut } = props;

  return (
    <>
      {offers.map((offer) => {
        const keyValue = offer.id;
        return (
          <CardItem
            key={keyValue}
            offer={offer}
            onMouseOver={onMouseOver}
            className={className}
            onMouseOut={onMouseOut}
          />
        );
      })}
    </>
  );
}

export default OffersList;
