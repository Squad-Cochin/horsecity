import React,{useState,useEffect} from "react";
import Routes from "./Routes/index";

import { getSettingsPageData } from './helpers/ApiRoutes/getApiRoutes'; 
// Import Scss
import './assets/scss/theme.scss';

// Fake Backend 
import fakeBackend from "./helpers/ApiRoutes/authApiRoutes";

// Activating fake backend
fakeBackend();



function App() {
  const [pageTitle, setPageTitle] = useState('HORSCITY');
  const [favicon, setFavicon] = useState('');
useEffect(() => {
  getAllData()
  document.title = pageTitle;
}, [pageTitle]);

useEffect(() => {
  const link = document.querySelector("link[rel='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'icon';
  link.href = favicon;
  // Replace the existing favicon or add the new favicon to the document head
  document.head.appendChild(link);
}, [favicon]);


async function getAllData() {
  let settingsData = await getSettingsPageData();
  setPageTitle(settingsData?.settingsPageData[0]?.application_title);
  setFavicon(settingsData?.settingsPageData[0]?.favicon)
 }
  return (
    <React.Fragment>
      <Routes />
    </React.Fragment>
  );
}

export default App;
