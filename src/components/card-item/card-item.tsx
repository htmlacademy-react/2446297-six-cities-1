import { Offer } from '../../types/offer';
import {Link} from 'react-router-dom';
import capitalizeFirstLetter from '../../helper-functions';

type CardItemProps = {
  offer: Offer;
  onMouseOver?: (evt: React.MouseEvent<HTMLInputElement>) => void;
  className: {
    article: string;
    img: string;
    info: string;
    imgHeight?: string;
    imgWidth?: string;
  };
};

function CardItem(props: CardItemProps): JSX.Element {
  const { offer, onMouseOver, className} = props;
  const { isPremium, price, title, type, previewImage, rating, id } = offer;
  return (
    <article className={`${className.article} place-card`} onMouseOver={onMouseOver}>
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : null}
      <div className={`${className.img} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${className.img} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export default CardItem;
