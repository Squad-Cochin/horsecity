///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                       File using for CHANGE PASSWORD in DASHBORD SETTINGS                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import {  useState, useEffect } from "react";
import changePassword from "../../../api/changePassword";
import { Alert } from 'reactstrap'
import Router from "next/router";

// Function for change password in settings
const PasswordInfo = () => {
  const [ errors, setErrors ] = useState("");
  const [ success, setSuccess ] = useState("");
  const [formData, setFormData] = useState({
    password: '',
    newpassword: '',
    confirmnewpassword: '',
  });

  useEffect(() => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('?');
    if (parts.length > 1) {
      const contentAfterQuestionMark = parts[1];
      const decodedContent = decodeURIComponent(contentAfterQuestionMark.replace(/\+/g, ' '));
      setErrors(decodedContent);
    }
  }, []);

  // Function for onchange while change in input password
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function for clear form data while clicking on cancel
  const clearForm = () => {
    setFormData({
      password: '',
      newpassword: '',
      confirmnewpassword: '',
    });
  };

  // Function for submit with new password
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = await JSON.parse(localStorage.getItem('userId'));
    if (Object.keys(userId).length !== 0) {
        let changePwd  = await changePassword(formData,userId.id)
        if(changePwd?.code === 200){
          setSuccess(changePwd.message)
          setErrors("");
          localStorage.setItem('userId', JSON.stringify({}));
          localStorage.setItem('loginData', JSON.stringify({}));
          Router.push("/others-pages/login")
        }else{
          setErrors(changePwd ? changePwd.message : "Internal server error.");
          setSuccess("")
        }
    }
  };

  return (
    <form className="col-xl-9" onSubmit={handleSubmit}>
        {success !== "" ? <Alert color="success"  className="custom-alert"><div>{success}</div></Alert> : null}
        {errors !== "" ? <Alert color="danger" ><div>{errors}</div></Alert> : null}
      <div className="row x-gap-20 y-gap-20">
        <div className="col-12">
          <div className="form-input ">
            <input    
                  type="text"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange} />
            <label className="lh-1 text-16 text-light-1">
              Current Password
            </label>
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-12">
          <div className="form-input ">
            <input
                  type="text"
                  name="newpassword"
                  required
                  value={formData.newpassword}
                  onChange={handleInputChange} />
            <label className="lh-1 text-16 text-light-1">New Password</label>
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-12">
          <div className="form-input ">
            <input
                  type="text"
                  name="confirmnewpassword"
                  required
                  value={formData.confirmnewpassword}
                  onChange={handleInputChange} />
            <label className="lh-1 text-16 text-light-1">
              New Password Again
            </label>
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-12">
          <div className="row x-gap-10 y-gap-10">
            <div className="col-auto">
              <button
                type="submit"
                className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
              >
                Save Changes <div className="icon-arrow-top-right ml-15" />
              </button>
            </div>
            <div className="col-auto">
              <button onClick={clearForm} className="button h-50 px-24 -blue-1 bg-blue-1-05 text-blue-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* End col-12 */}
      </div>
    </form>
  );
};

export default PasswordInfo;
