import {  useState } from "react";
import changePassword from "../../../api/changePassword";
import { Alert } from 'reactstrap'

const PasswordInfo = () => {
  const [ errors, setErrors ] = useState("");
  const [ success, setSuccess ] = useState("");
  const [formData, setFormData] = useState({
    password: '',
    newpassword: '',
    confirmnewpassword: '',
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const clearForm = () => {
    setFormData({
      password: '',
      newpassword: '',
      confirmnewpassword: '',
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const loginData = await JSON.parse(localStorage.getItem('loginData'));
    if (Object.keys(loginData).length !== 0) {
        let changePwd  = await changePassword(formData,loginData.id)
        // console.log("REsponsee",changePwd);

        if(changePwd.code === 200){
          setSuccess(changePwd.message)
          setErrors("");
        }else{
          setErrors(changePwd.message);
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
