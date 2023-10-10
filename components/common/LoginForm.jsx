///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                          File using for login form in LOGIN pages                                 //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import Link from "next/link";
import loginApi from "../../pages/api/loginApi";
import { Alert } from 'reactstrap'
import { useEffect, useState } from "react";
import Router from "next/router";

// Function for login form
const LoginForm = () => {
  const [ errors, setErrors ] = useState("");
  const [ success, setSuccess ] = useState("");
  const [url,setUrl] =useState(false);

  useEffect(()=>{
    initialLoad();
  })

  async function initialLoad(){
    const searchData = await JSON.parse(localStorage.getItem('searchObject'));
    if (searchData.number_of_horses !='' && searchData.trip_type.length != 0) {
      setUrl(true);
    }else{
      setUrl(false);
    }
  }

  // Function for form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Access form fields using event.target
    const formData = new FormData(event.target);
    const userName = formData.get('userName');
    const password = formData.get('password');
    let loginData = {
      "userName" : userName,
      "password" : password
    }
    let res = await loginApi(loginData);
    if(res?.code === 200){
      {url ? Router.push("/package/listing") : Router.push("/") }
      localStorage.setItem('loginData', JSON.stringify(res?.data));
      localStorage.setItem('userId', JSON.stringify(res?.data));
      setSuccess(res?.message)
      setErrors("");
    }else if(res?.code === 404) {
      localStorage.setItem('userId', JSON.stringify(res?.data));
      Router.push(`/dashboard/db-settings?${res?.message}`)
    }else{
      setErrors(res?.message);
      setSuccess("")
    }
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
