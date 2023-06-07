//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                            BIGINING OF THE PROJECT EVERY PAGES LOAD HERE.                            //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////


import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service worker registered:', registration);
          })
          .catch((error) => {
            console.log('Service worker registration failed:', error);
          });
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
