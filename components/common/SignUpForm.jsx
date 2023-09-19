///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                          File using for registration form design                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import registrationApi from "../../pages/api/registrationApi";
import { Alert } from 'reactstrap'
import Router from "next/router";

// Function for regsitration form 
const SignUpForm = () => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [ errors, setErrors ] = useState("");
  const [ success, setSuccess ] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here, you can access form field values and perform any necessary actions
    // For example, you might want to send the form data to an API or dispatch Redux actions

    // Access form fields using event.target
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const userName = formData.get('userName');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const phone = formData.get('phone');
    if( password !== confirmPassword ){
      setSuccess("")
      setErrors("The entered password and confirm password do not match.")
    } else {
      let registrationData = {
        "name" : name,
        "email" : email,
        "userName" : userName,
        "password" : password,
        "confirmPassword" : confirmPassword,
        "date_of_birth" : dateOfBirth,
        "contact_no" : phone,
      }
      // ... and so on

      // Perform any actions with the form data
      let res = await registrationApi(registrationData);
      if(res?.code !== 200){
        setErrors(res?.message);
        setSuccess("")
      }else{
        Router.push("/others-pages/login")
        setSuccess(res?.message)
        setErrors("");
      }
    }
  };
  return (
    <form  className="row y-gap-20" onSubmit={handleSubmit} >
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10" >
          Already have an account yet?{" "}
          <Link href="/others-pages/login" className="text-blue-1">
            Log in
          </Link>
        </p>
        {success !== "" ? <Alert color="success"  className="custom-alert"><div>{success}</div></Alert> : null}
        {errors !== "" ? <Alert color="danger" ><div>{errors}</div></Alert> : null}
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="name" required />
          <label className="lh-1 text-14 text-light-1">Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="email" name="email" required />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
         
          <DatePicker
            name="dateOfBirth"
            inputClass="custom_input-picker"
            containerClassName="custom_container-picker"
            selected={dateOfBirth}
            onChange={(date) => {
              setDateOfBirth(date) ; 
            }}
            maxDate={new Date()}
            dateFormat="MMM dd"
          />
         
          <label className="lh-1 text-14 text-light-1 spl-space-top">Date Of Birth</label>
        </div>
      </div>

      <div className="col-12">
        <div className="form-input ">
          <input type="number" name="phone" required />
          <label className="lh-1 text-14 text-light-1">Contact Number</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
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

      <div className="col-12">
        <div className="form-input ">
          <input type="password" name="confirmPassword" required />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          href="#top"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign Up <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default SignUpForm;
