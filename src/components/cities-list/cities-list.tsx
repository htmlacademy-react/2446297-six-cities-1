import { CITIES } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { changeCity } from '../../store/offers-process/offer-process';
import { setOffersList } from '../../store/offers-data/offers-data';
import { City } from '../../types/offer';

type CityListProps = {
  activeCity: City;
};

function CitiesList({ activeCity }: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES.map((city) => {
              const keyValue = city.name;
              return (
                <li className="locations__item"
                  key={keyValue}
                  onClick={() => {
                    dispatch(changeCity({city: city}));
                    dispatch(setOffersList({city: city}));
                  }}
                >
                  <a className={`locations__item-link tabs__item ${ activeCity === city ? 'tabs__item--active' : ''}`}>
                    <span>{city.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}


export default CitiesList;
