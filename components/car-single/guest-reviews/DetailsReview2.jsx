import Image from "next/image";
import ReviewGallery from "./ReviewGallery";

const DetailsReview2 = () => {
  return (
    <div className="row y-gap-40">
 

      <div className="col-lg-12">
        <div className="row x-gap-20 y-gap-20 items-center">
          <div className="col-auto">
            <Image
              width={60}
              height={60}
              src="/img/avatars/2.png"
              alt="image"
            />
          </div>
          <div className="col-auto">
            <div className="fw-500 lh-15">Tonko</div>
            <div className="text-14 text-light-1 lh-15">March 2022</div>
          </div>
        </div>
        {/* End .row */}

        <p className="text-15 text-dark-1 mt-10">
        is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries,.{" "}
        </p>

        {/* <ReviewGallery /> */}


      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="row x-gap-20 y-gap-20 items-center">
          <div className="col-auto">
            <Image
              width={60}
              height={60}
              src="/img/avatars/2.png"
              alt="image"
            />
          </div>
          <div className="col-auto">
            <div className="fw-500 lh-15">Tonko</div>
            <div className="text-14 text-light-1 lh-15">March 2022</div>
          </div>
        </div>
        {/* End .row */}


        <p className="text-15 text-dark-1 mt-10">
        is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries,.{" "}
        </p>

      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="row x-gap-20 y-gap-20 items-center">
          <div className="col-auto">
            <Image
              width={60}
              height={60}
              src="/img/avatars/2.png"
              alt="image"
            />
          </div>
          <div className="col-auto">
            <div className="fw-500 lh-15">Tonko</div>
            <div className="text-14 text-light-1 lh-15">March 2022</div>
          </div>
        </div>
        {/* End .row */}


        <p className="text-15 text-dark-1 mt-10">
        is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries,.{" "}
        </p>

      </div>
      {/* End .col */}

      <div className="col-auto">
        <a href="#" className="button -md -outline-blue-1 text-blue-1">
          Show all 116 reviews{" "}
          <div className="icon-arrow-top-right ml-15"></div>
        </a>
      </div>
      {/* End .col-auto */}
    </div>
  );
};

export default DetailsReview2;
