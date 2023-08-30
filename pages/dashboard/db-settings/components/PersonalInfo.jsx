import AvatarUploader from "./AvatarUploader";
import { useEffect, useState } from "react";
import DateSearch from "../../../../components/hero/DateSearch";
import getCustomerInfo from "../../../api/getCustomInfo";
import postCustomerInfo from "../../../api/postCustomerInfo";
import { Alert } from 'reactstrap'
// const resObj = {
//   name: 'shaheer',
//   userName: 'shaheer123',
//   email: 'shaheer@gmail.com',
//   contact_no: '4567894564',
//   birthday: '',
//   id_proof_no: '315464646468',
//   id_proof_image : ''
// }
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
  async function initialLoad(){
    const loginData = await JSON.parse(localStorage.getItem('loginData'));

    if (Object.keys(loginData).length !== 0) {
        const  resObj = await getCustomerInfo(loginData.id) ;
        console.log("REAAA",resObj);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);




    const loginData = await JSON.parse(localStorage.getItem('loginData'));
    if (Object.keys(loginData).length !== 0) {
    let Customerinfo  = await postCustomerInfo(formData,loginData.id)
        if(Customerinfo.code == 200){
          setSuccess(Customerinfo.message)
          setErrors("");
        }else{
          setErrors(Customerinfo.message);
          setSuccess("")
        }
  }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <AvatarUploader /> */}
        {/* End AvatarUploader*/}
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
                {/* {
                  formData.birthday ? ( <DateSearch use='date-of-birth' formData={formData}  setFormData={setFormData} />) : (
                    <DateSearch use='date-of-birth' formData={new Date()}  setFormData={setFormData} />
                  )
                } */}
                  <DateSearch use='date-of-birth' formData={formData}  setFormData={setFormData} />
                <label className="lh-1 text-16 text-light-1">
                  Birthday
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input type="text"
                  name="id_proof_no"
                  required
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
