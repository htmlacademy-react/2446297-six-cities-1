import { CITIES } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeCity } from '../../store/action';
import { getOffersList } from '../../store/action';
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
                    dispatch(changeCity(city));
                    dispatch(getOffersList(city));
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
