import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchRoomAction, fetchNearByHotelsAction, fetchCommentsAction } from '../../store/api-actions';
import capitalizeFirstLetter from '../../helper-functions';
import Feedbacks from '../../components/feedbacks/feedbacks';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import NearPlaces from '../../components/near-places/near-places';
import HostInfo from '../../components/host-info/host-info';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';
import { getRoomDataLoadingStatus, getNearByHotelsDataLoadingStatus, getCommentsDataLoadingStatus, getRoom, getNearByHotels } from '../../store/offers-data/selectors';

function OfferScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const isRoomDataLoading = useAppSelector(getRoomDataLoadingStatus);
  const isNearByHotelsDataLoading = useAppSelector(getNearByHotelsDataLoadingStatus);
  const isCommentsDataLoading = useAppSelector(getCommentsDataLoadingStatus);

  useEffect(() => {
    if (id) {
      const roomId = Number(id);
      dispatch(fetchRoomAction(roomId));
      dispatch(fetchNearByHotelsAction(roomId));
      dispatch(fetchCommentsAction(roomId));
    }
  }, [id, dispatch]);

  const offer = useAppSelector(getRoom);
  const user = useAppSelector(getUser);
  const nearestRooms = useAppSelector(getNearByHotels);
  const nearestPoints = nearestRooms.map((offerItem) => offerItem.location);

  if (isRoomDataLoading || isNearByHotelsDataLoading || isCommentsDataLoading) {
    return (
      <Spinner />
    );
  }

  if (!id || !offer) {
    return <Navigate to="/404" replace />;
  }

  nearestPoints.push(offer?.location);
  const { bedrooms, goods, host, images, description, isPremium, maxAdults, price, rating, title, type, city, location} = offer;

  return (
    <div className="page">
      <Header authorizationStatus={authorizationStatus} user={user}/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, 6).map((img, index) => {
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
                  <span style={{ width: `${Math.floor(rating) * 20}%` }}></span>
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
              <HostInfo host={host} description={description}/>
              <Feedbacks hotelId={id} authorizationStatus={authorizationStatus}/>
            </div>
          </div>
          <Map city={city}
            points={nearestPoints}
            selectedPoint={location}
            className="offer__map"
            mapHeight='579px'
          />
        </section>
        <div className="container">
          <NearPlaces nearestRooms={nearestRooms}/>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
