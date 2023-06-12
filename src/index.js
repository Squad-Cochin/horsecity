
import  ReactDOM  from "react-dom/client";
import './index.css';
import  App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <>
    <GoogleOAuthProvider clientId= "1023374887244-5ckguqq4o592365am9gfmrd9s9ojvp1d.apps.googleusercontent.com">
     <App/>
     </GoogleOAuthProvider>
  </>
)