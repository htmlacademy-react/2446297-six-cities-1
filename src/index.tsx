import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import {offers} from './mocks/offers';
import {feedbacks} from './mocks/reviews';

const Setting = {
  OffersCount: 134,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      offersCount = {Setting.OffersCount}
      offers = {offers}
      feedbacks = {feedbacks}
    />
  </React.StrictMode>,
);
