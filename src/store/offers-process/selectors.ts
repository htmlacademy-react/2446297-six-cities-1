import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { City } from '../../types/offer';

export const getCity = (state: State): City => state[NameSpace.Offers].city ?? {name: 'Paris', location: {latitude: 48.85661, longitude: 2.351499, zoom: 12}};
