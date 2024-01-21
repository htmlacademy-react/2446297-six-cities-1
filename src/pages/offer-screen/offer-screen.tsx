import { useParams } from 'react-router-dom';
import { Offers, Feedbacks } from '../../types/offer';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import capitalizeFirstLetter from '../../helper-functions';

import FeedbackForm from '../../components/feedback-form/feedback-form';

type OfferScreenProps = {
  offers: Offers;
  feedbacks: Feedbacks;
}

function OfferScreen({offers, feedbacks}: OfferScreenProps): JSX.Element {
  const { id } = useParams();
  if (id) {
    const offer = offers.find((item) => item.id === +id);
    if (offer) {
      const { bedrooms, goods, host, images, description, isPremium, maxAdults, price, rating, title, type} = offer;
      return (
        <div className="page">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Link className="header__logo-link" to={AppRoute.Main}>
                    <img
                      className="header__logo"
                      src="img/logo.svg"
                      alt="6 cities logo"
                      width="81"
                      height="41"
                    />
                  </Link>
                </div>
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          Oliver.conner@gmail.com
                        </span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>

          <main className="page__main page__main--offer">
            <section className="offer">
              <div className="offer__gallery-container container">
                <div className="offer__gallery">
                  {images.map((img, index) => {
                    const keyValue = `${index}-${img}`;
                    return (
                      <div className="offer__image-wrapper" key={keyValue}>
                        <img
                          className="offer__image"
                          src={img}
                          alt="Photo studio"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="offer__container container">
                <div className="offer__wrapper">
                  {isPremium ?
                    <div className="offer__mark">
                      <span>Premium</span>
                    </div>
                    : null}
                  <div className="offer__name-wrapper">
                    <h1 className="offer__name">
                      {title}
                    </h1>
                    <button className="offer__bookmark-button button" type="button">
                      <svg className="offer__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="offer__rating rating">
                    <div className="offer__stars rating__stars">
                      <span style={{ width: `${rating * 20}%` }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="offer__rating-value rating__value">{rating}</span>
                  </div>
                  <ul className="offer__features">
                    <li className="offer__feature offer__feature--entire">
                      {capitalizeFirstLetter(type)}
                    </li>
                    <li className="offer__feature offer__feature--bedrooms">
                      {bedrooms} Bedrooms
                    </li>
                    <li className="offer__feature offer__feature--adults">
                      Max {maxAdults} adults
                    </li>
                  </ul>
                  <div className="offer__price">
                    <b className="offer__price-value">&euro;{price}</b>
                    <span className="offer__price-text">&nbsp;night</span>
                  </div>
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">What&apos;s inside</h2>
                    <ul className="offer__inside-list">
                      {goods.map((good, index) => {
                        const keyValue = `${index}-${good}`;
                        return (
                          <li className="offer__inside-item" key={keyValue}>{good}</li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="offer__host">
                    <h2 className="offer__host-title">Meet the host</h2>
                    <div className="offer__host-user user">
                      <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                        <img
                          className="offer__avatar user__avatar"
                          src={host.avatarUrl}
                          width="74"
                          height="74"
                          alt="Host avatar"
                        />
                      </div>
                      <span className="offer__user-name">{host.name}</span>
                      {host.isPro ?
                        <span className="offer__user-status">Pro</span>
                        : null}
                    </div>
                    <div className="offer__description">
                      <p className="offer__text">
                        {description}
                      </p>
                    </div>
                  </div>
                  <section className="offer__reviews reviews">
                    <h2 className="reviews__title">
                      Reviews &middot; <span className="reviews__amount">{feedbacks.length}</span>
                    </h2>
                    <ul className="reviews__list">
                      {feedbacks.map((feedback, index) => {
                        const keyFeedbackValue = `${index}-${feedback.user.avatarUrl}`;
                        return (
                          <li className="reviews__item" key={keyFeedbackValue}>
                            <div className="reviews__user user">
                              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                                <img
                                  className="reviews__avatar user__avatar"
                                  src={feedback.user.avatarUrl}
                                  width="54"
                                  height="54"
                                  alt="Reviews avatar"
                                />
                              </div>
                              <span className="reviews__user-name">{feedback.user.name}</span>
                            </div>
                            <div className="reviews__info">
                              <div className="reviews__rating rating">
                                <div className="reviews__stars rating__stars">
                                  <span style={{ width: `${feedback.rating * 20}%` }}></span>
                                  <span className="visually-hidden">Rating</span>
                                </div>
                              </div>
                              <p className="reviews__text">
                                {feedback.comment}
                              </p>
                              <time className="reviews__time" dateTime={feedback.date}>
                                {feedback.date}
                              </time>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <FeedbackForm />
                  </section>
                </div>
              </div>
              <section className="offer__map map"></section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">
                  Other places in the neighbourhood
                </h2>
                <div className="near-places__list places__list">
                  <article className="near-places__card place-card">
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img
                          className="place-card__image"
                          src="img/room.jpg"
                          width="260"
                          height="200"
                          alt="Place image"
                        />
                      </a>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;80</b>
                          <span className="place-card__price-text">
                            &#47;&nbsp;night
                          </span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button"
                        >
                          <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19"
                          >
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: '80%' }}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Wood and stone place</a>
                      </h2>
                      <p className="place-card__type">Private room</p>
                    </div>
                  </article>

                  <article className="near-places__card place-card">
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img
                          className="place-card__image"
                          src="img/apartment-02.jpg"
                          width="260"
                          height="200"
                          alt="Place image"
                        />
                      </a>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;132</b>
                          <span className="place-card__price-text">
                            &#47;&nbsp;night
                          </span>
                        </div>
                        <button
                          className="place-card__bookmark-button button"
                          type="button"
                        >
                          <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19"
                          >
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">To bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: '80%' }}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Canal View Prinsengracht</a>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>

                  <article className="near-places__card place-card">
                    <div className="place-card__mark">
                      <span>Premium</span>
                    </div>
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img
                          className="place-card__image"
                          src="img/apartment-03.jpg"
                          width="260"
                          height="200"
                          alt="Place image"
                        />
                      </a>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">
                            &#47;&nbsp;night
                          </span>
                        </div>
                        <button
                          className="place-card__bookmark-button button"
                          type="button"
                        >
                          <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19"
                          >
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">To bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: '100%' }}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Nice, cozy, warm big bed apartment</a>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>
                </div>
              </section>
            </div>
          </main>
        </div>
      );
    }
    else {
      return <Navigate to="/404" replace />;
    }

  }
  else {
    return <Navigate to="/404" replace />;
  }
}

export default OfferScreen;