import React from 'react'

import styles from './Login.module.scss';
import ButtonType from '../../components/elementComponents/Button/Button';
import InputType from '../../components/elementComponents/Input/Input';
import { LoginSocialFacebook } from 'reactjs-social-login';
 
import { GoogleLogin } from '@leecheuk/react-google-login';
// import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from "react-router-dom";
const clientID = "1023374887244-5ckguqq4o592365am9gfmrd9s9ojvp1d.apps.googleusercontent.com"
function LoginPage() {
  let navigate = useNavigate();
  //Google response
  const onSuccess = (response) => {
    console.log(response);
  };
  const onFailure = (error) => {
      console.log(error);
  };

  // Facebook response
  const handleResolve = (response) => {
    console.log(response);
  };
  const handleReject = (error) => {
    console.log('err', error);
  };
  return (
    <>
      <div className={styles['login-container']}>
        <div className={styles['login-modal']}>
          <h2>Login</h2>
          <InputType className='login-input' type="text" placeholder="Username" />
          <InputType className='login-input' type="password" placeholder="Password" />
          <ButtonType className="login-button" name="Login" onClick={() => navigate('/listing')} />
          <div className={styles['social-login-buttons']}>
            <LoginSocialFacebook
              appId="App id"
              onResolve={handleResolve}
              onReject={handleReject}
            >
              <ButtonType className="facebook-button" name="Facebook" />
            </LoginSocialFacebook>
            <GoogleLogin
              clientId = {clientID}
              buttonText = 'Login'
              onSuccess = {onSuccess}
              onFailure = {onFailure}
              cookiePolicy = {'single_host_origin'}
              isSignedIn = {true}
              />
            {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
          </div>
          <div className={styles['signup-button']}>
            Don't have an account? <Link to={'/'}>Sign up</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage