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
  
useEffect(() => {
  getAllData()
  document.title = pageTitle;
}, [pageTitle]);

async function getAllData() {
  let settingsData = await getSettingsPageData();
  setPageTitle(settingsData?.settingsPageData[0]?.application_title);
 }
  return (
    <React.Fragment>
      <Routes />
    </React.Fragment>
  );
}

export default App;
