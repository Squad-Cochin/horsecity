import Link from "next/link";
import loginApi from "../../pages/api/loginApi";
import { Alert } from 'reactstrap'
import { useState } from "react";
import Router from "next/router";

const LoginForm = () => {
  const [ errors, setErrors ] = useState("");
  const [ success, setSuccess ] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here, you can access form field values and perform any necessary actions
    // For example, you might want to send the form data to an API or dispatch Redux actions

    // Access form fields using event.target
    const formData = new FormData(event.target);
    const userName = formData.get('userName');
    const password = formData.get('password');
    console.log("rea",userName,password)
    // const name = formData.get('name');
    // const email = formData.get('email');
    // const userName = formData.get('userName');
    // const password = formData.get('password');
    // const confirmPassword = formData.get('confirmPassword');
    // const phone = formData.get('phone');
    // if( password !== confirmPassword ){
    //   setSuccess("")
    //   setErrors("Password and confirm password must be same.")
    // } else {
    let loginData = {
      "userName" : userName,
      "password" : password
    }
      // ... and so on

    let res = await loginApi(loginData);
    if(res.code === 200){
      Router.push("/car/car-list-v1")
      localStorage.setItem('loginData', JSON.stringify(res.data));
      setSuccess(res.message)
      setErrors("");
    }else{
      setErrors(res.message);
      setSuccess("")
    }
    // }
  };
  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Don&apos;t have an account yet?{" "}
          <Link href="/others-pages/signup" className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
      {success !== "" ? <Alert color="success"  className="custom-alert"><div>{success}</div></Alert> : null}
        {errors !== "" ? <Alert color="danger" ><div>{errors}</div></Alert> : null}
        <div className="form-input ">
          <input type="text" name="userName" required />
          <label className="lh-1 text-14 text-light-1">User Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" name="password" required />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-12">
        <a href="#" className="text-14 fw-500 text-blue-1 underline">
          Forgot your password?
        </a>
      </div> */}
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign In <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default LoginForm;
