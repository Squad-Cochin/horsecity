import React from 'react'

import styles from './Login.module.scss';
import ButtonType from '../../components/elementComponents/Button/Button';
import InputType from '../../components/elementComponents/Input/Input';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  let navigate = useNavigate();
  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
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
              onResolve={(response) => {
                console.log(response);
              }}
              onReject={(error) => {
                console.log("err", error);
              }}
            >
              <ButtonType className="facebook-button" name="Facebook" />
            </LoginSocialFacebook>
            {/* <ButtonType className="gmail-button" name="Gmail" onClick={() => console.log("hello world")} /> */}
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
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