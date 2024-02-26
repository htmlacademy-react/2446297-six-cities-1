import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { City } from '../../types/offer';
import { CITIES } from '../../const';

export const getCity = (state: State): City => state[NameSpace.Offers].city ?? CITIES[0];
