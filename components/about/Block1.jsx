///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                            File using for giving about details                                    //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


import Image from "next/image";

// Function for the content of about Kailplus(Page Who We Are)
const Block1 = ({aboutUs}) => {

  // FUNCTION FOR IMAGE LOADER
  const imageLoader = ({src, width, quality})=>{
    return `${src}`;
  }
  return (
    <>
      <div className="col-lg-5">
        <h2 className="text-30 fw-600">{aboutUs?.title}</h2>
        <p className="mt-5">{aboutUs?.caption}</p>
        <p className="text-dark-1 mt-60 lg:mt-40 md:mt-20">
        {aboutUs?.description}
        </p>
      </div>
      {/* End .col */}

      <div className="col-lg-6">
        <Image
          src={aboutUs?.image}
          loader={imageLoader}
          width={400}
          height={400}
          alt="image"
          className="rounded-4 w-100"
        />
      </div>
      {/* End .col */}
    </>
  );
};
Block1.defaultProps = {
  aboutUs : {
    title : '',
    caption : '',
    description : '',
    image : ''
  }
}
export default Block1;
