///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                  File using for PERSONAL INFORMATION in DASHBORD SETTINGS                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import AvatarUploader from "./AvatarUploader";
import { useEffect, useState } from "react";
import DateSearch from "../../../../components/hero/DateSearch";
import getCustomerInfo from "../../../api/getCustomInfo";
import postCustomerInfo from "../../../api/postCustomerInfo";
import { Alert } from 'reactstrap'

// Function for personal information in settings
const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    contact_no: '',
    birthday: '',
    id_proof_no: '',
    id_proof_image: '',
  });
  const [ errors, setErrors ] = useState("");
  const [ success, setSuccess ] = useState("");

  useEffect(() => {
    initialLoad();
  }, []);

  // Function for initial load of the page for getting current data for the customer
  async function initialLoad(){
    const loginData = await JSON.parse(localStorage.getItem('loginData'));
    if (Object.keys(loginData).length !== 0) {
      const  resObj = await getCustomerInfo(loginData.id) ;
      setFormData({
        name: resObj?.name || '',
        userName: resObj?.userName || '',
        email: resObj?.email || '',
        contact_no: resObj?.contact_no || '',
        birthday: resObj?.birthday || '',
        id_proof_no: resObj?.id_proof_no || '',
        id_proof_image: resObj?.id_proof_image || '',
      });
    }
  }

  // Function for on change in the current value in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function for scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function for handle submit dor update the personal information
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = await JSON.parse(localStorage.getItem('loginData'));
    if (Object.keys(loginData).length !== 0) {
      let Customerinfo  = await postCustomerInfo(formData,loginData.id)
      if(Customerinfo.code == 200){
        setSuccess(Customerinfo.message)
        setErrors("");
        initialLoad();
        scrollToTop()
      }else{
        setErrors(Customerinfo.message);
        setSuccess("")
        scrollToTop()
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {success !== "" ? <Alert color="success"  className="custom-alert"><div>{success}</div></Alert> : null}
        {errors !== "" ? <Alert color="danger" ><div>{errors}</div></Alert> : null}
        <div className="border-top-light mt-30 mb-30" />
        <div className="col-xl-9">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-12">
              <div className="form-input ">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange} />
                <label className="lh-1 text-16 text-light-1">
                  Name
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-input ">
                <input type="text"
                  name="userName"
                  required
                  value={formData.userName}
                  onChange={handleInputChange} />
                <label className="lh-1 text-16 text-light-1">User Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange} />
                <label className="lh-1 text-16 text-light-1">Email</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input type="text"
                  name="contact_no"
                  required
                  value={formData.contact_no}
                  onChange={handleInputChange} />
                <label className="lh-1 text-16 text-light-1">
                  Phone Number
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <DateSearch use='date-of-birth' formData={formData}  setFormData={setFormData} />
                <label className="lh-1 text-16 text-light-1">
                  Date of Birth
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input type="text"
                  name="id_proof_no"
                  value={formData.id_proof_no}
                  onChange={handleInputChange} />
                <label className="lh-1 text-16 text-light-1">Id Proof No</label>
              </div>
            </div>
            <AvatarUploader  formData={formData}  setFormData={setFormData}/>
          </div>
        </div>
        {/* End col-xl-9 */}

        <div className="d-inline-block pt-30">
          <button
            type="submit"
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          >
            Save Changes <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
