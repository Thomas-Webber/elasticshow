import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/i18n/{{lng}}.json',
      queryStringParams: { v: '0.1.0' },
    },
    lng: CONFIG.language || navigator.language.substring(0,2),
    fallbackLng: CONFIG.language || 'en',
    react: {
      useSuspense: false,
      wait: false,
    },
    debug: false,
    keySeparator: false,
  });

ReactDOM.render(<App />, document.getElementById('root'));
