import React,{useEffect} from 'react'

import styles from './Login.module.scss';
import ButtonType from '../../components/elementComponents/Button/Button';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';
const clientID = '976181089847-ootn07v1p42rphpo9viumple2mri290p.apps.googleusercontent.com';

function LoginPage() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientID : clientID,
        scope : ""
      })
    };
  gapi.load('client:auth2', start);
});

const onSuccess = (res) =>
{
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
}

const onFailure = (res) =>
{
    console.log("LOGIN Failed ! user: ", res);
}
 
  return (
    <>
    <div className={styles['login-container']}>
      <div className={styles['login-modal']}>
        <h2>Login</h2>
        <input className={styles['login-input']} type="text" placeholder="Username" />
        <input className={styles['login-input']} type="password" placeholder="Password" />
        {/* <button className={styles['login-button']}>Login</button> */}
        <ButtonType className="login-button" name="Login" onClick={() =>console.log("hello world")}/>
        <div className={styles['social-login-buttons']}>
        <LoginSocialFacebook
          appId="App id"
          onResolve={(response) => {
            console.log(response);
      
          }}
          onReject={(error) => {
            console.log("err",error);
          }}
        >
        <ButtonType className="btntype2" name="Facebook" onClick={() =>console.log("hello world")}/>
             
        </LoginSocialFacebook>
        {/* <ButtonType className="btntype2" name="Gmail" onClick={() =>console.log("hello world")}/> */}
        <GoogleLogin
                clientId = {clientID}
                buttonText = 'Login'
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                isSignedIn = {true}
            />
        </div>
        <div className={styles['signup-button']}>
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </div>
    </div>
    </>
  )
}

export default LoginPage