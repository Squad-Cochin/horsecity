import Image from "next/image";
import React, { useState ,useEffect} from "react";

const AvatarUploader = (props) => {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  console.log("Date",props.formData.id_proof_image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setImage(URL.createObjectURL(file));
    if (!file) {
      setError("Please select an image.");
      setSuccess(false);
      return;
    }

    if (file.size > 800 * 1024) {
      setError("Image must be smaller than 800KB.");
      setSuccess(false);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      setSuccess(false);
      return;
    }
    const newFormData = {
      ...props.formData,
      id_proof_image : file
    }

      props.setFormData(newFormData)


  };


// FUNCTION FOR IMAGE LOADER

  const imageLoader = ({ src, width, quality }) => {

    return `${src}`;

  };

  return (
    <div className="row y-gap-30 items-center">
   <div className="col-auto">
    <div className="d-flex ratio ratio-1:1 w-200">
      {props.formData.id_proof_image? ( 
      <Image
      src={props.formData.id_proof_image}
      loader={imageLoader}
      width={200}
      height={200}
      alt="ID Proof"
      className="img-ratio rounded-4"
    />):null}
     {image? ( 
      <Image
      src={image}
      width={200}
      height={200}
      alt="ID Proof"
      className="img-ratio rounded-4"
    />):null}
 
  </div>
</div>


      <div className="col-auto">
        <h4 className="text-16 fw-500">Id Proof Image</h4>
        {/* <div className="text-14 mt-5">
          PNG or JPG no bigger than 800px wide and tall.
        </div> */}
        <div className="d-inline-block mt-15">
          <label
            htmlFor="avatar-upload"
            role="button"
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          >
            <i className="icon-upload-file text-20 mr-10" />
            Browse
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            style={{ display: "none" }}

          />
        </div>
        {error && !success && <div className="text-red-1 mt-1">{error}</div>}
      </div>
    </div>
  );
};
AvatarUploader.defaultProps = {
  formData : {
    name: '',
    userName: '',
    email: '',
    contact_no: '',
    birthday: '',
    id_proof_no: '',
    id_proof_image: '',
  }
}
export default AvatarUploader;


