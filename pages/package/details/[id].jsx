///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                           File for showing the whole DETAILS page                                 //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import "photoswipe/dist/photoswipe.css";
import Seo from "../../../components/common/Seo";
import Header11 from "../../../components/header/header-11";
import Overview from "../../../components/details/Overview";
import PropertyHighlights from "../../../components/details/PropertyHighlights";
import ReviewProgress2 from "../../../components/details/guest-reviews/ReviewProgress2";
import DetailsReview2 from "../../../components/details/guest-reviews/DetailsReview2";
import ReplyForm from "../../../components/details/ReplyForm";
import ReplyFormReview2 from "../../../components/details/ReplyFormReview2";
import CallToActions from "../../../components/common/CallToActions";
import DefaultFooter from "../../../components/footer/default";
import SlideGallery from "../../../components/details/SlideGallery";
import FilterBox from "../../../components/details/filter-box";
import Faq from "../../../components/faq/Faq";
import { useDispatch } from "react-redux";
import DetailsDataApi from "../../api/detailDataApi";
import { booking_data } from "../../../features/bookingData/bookingData";

// Function for the whole details page
const TourSingleV1Dynamic = () => {
  const router = useRouter();
  const [vehicle, setVehicle] = useState([]);
  const [ vehicleImages, setVehicleImages ] = useState([]);
  const [url,setUrl] =useState(false);
  const [noOfHorse ,setNoOfHorse ] = useState('');
  const [ reviewDetails, setReviewDetails ] = useState({});
  const [ error, setError ] = useState("");
  const id = router.query.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) <h1>Loading...</h1>;

    else  getProductDetails();
  },[id])

  // Function for getting product details through api
  async function getProductDetails(){
    const loginData = (await JSON.parse(localStorage.getItem('loginData')))?? {};
    const searchData = await JSON.parse(localStorage.getItem('searchObject'));
    if(searchData?.number_of_horses !=''){
      setUrl(true);
    }else{
      setUrl(false);
    }
    let packageDetails = await DetailsDataApi(id);
    if(!packageDetails){
      console.log("reach")
      setError("Product is not available now, please try again later.")
    }
    setReviewDetails( packageDetails ? ("reviews" in packageDetails? packageDetails?.reviews : {}) : {})
    setVehicle(packageDetails?.vehicle[0])
    setVehicleImages(packageDetails?.images);
    setNoOfHorse(packageDetails?.vehicle[0]?.no_of_horses)
    if (Object.keys(loginData).length !== 0) {
    dispatch(booking_data({
      customer_id : loginData.id, 
      vehicle_id :  id,
      serviceprovider_id : packageDetails?.vehicle[0]?.service_provider_id,
      no_of_horse : packageDetails?.vehicle[0]?.no_of_horses
      }))
    }
  }

  return (
    <>
      <Seo pageTitle="Package details" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}
      
      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-lg-8">
              <div className="row y-gap-20 justify-between items-end">
                <div className="col-auto">
                <a onClick={() =>url ? router.push("/package/listing") : router.push("/dashboard/db-wishlist")}  style={{ cursor: 'pointer' }}><IoIosArrowBack/><b>Back to page</b></a>
                  {error != "" ? <h1 className="text-25 sm:text-15 fw-600" style={{ color: "red" }}>{error}</h1> : null}
                  <h1 className="text-30 sm:text-24 fw-600">{vehicle?.make} {vehicle?.model}</h1>
                  <div className="row x-gap-10 items-center pt-10">
                  </div>
                </div>
                {/* End title and other info */}
              </div>
              {/* End .row */}
              {error == "" ?
              <div className="mt-40">
                <SlideGallery images={vehicleImages} />
              </div> : null }
            </div>
            {/* End col-lg-8 left car gallery */}

            {error == "" ?
              <div className="col-lg-4">
                <div className="d-flex justify-end">
                  <div className="px-30 py-30 rounded-4 border-light shadow-4 bg-white w-360 lg:w-full">
                    <div className="row y-gap-15 items-center justify-between">
                      <div className="col-auto">
                        <div className="text-14 text-light-1">
                          From
                          <span className="text-20 fw-500 text-dark-1 ml-5">
                            {vehicle?.abbreviation} {vehicle?.price}
                          </span>
                        </div>
                      </div>
                      {/* End .col-auto */}

                      
                      {/* End .col-auto */}
                    </div>
                    {/* End .row */}

                    <div className="row y-gap-20 pt-20">
                      <FilterBox noOfHorse={noOfHorse}/>
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End px-30 */}
                </div>
                {/* End d-flex */}
              </div>
            :null}
            {/* End col right car sidebar filter box */}
          </div>
          {/* End .row */}
        </div>
        {/* End .containar */}
      </section>
      {/* End Galler single */}
      {error == "" ?
        <section className="pt-40">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div>
                  <h3 className="text-22 fw-500">Property highlights</h3>
                  <PropertyHighlights vehicle={vehicle} />
                  <Overview vehicle={vehicle} />
                </div>
              </div>
              {/* End .col-lg-8 */}
            </div>
            {/* End .row */}
          </div>
          {/* End container */}
        </section>
      : null }
      {/* End pt-40 */}

      {/* End main content section */}
      {error == "" ?
        <section className="pt-40">
          <div className="container ">
            <div className="row y-gap-20">
              <div className="col-lg-4">
                <h2 className="text-22 fw-500">
                  FAQs about
                  <br /> Best Package Model
                </h2>
              </div>
              {/* End .row */}

              <div className="col-lg-8">
                <div
                  className="accordion -simple row y-gap-20 js-accordion"
                  id="Faq1"
                >
                  <Faq />
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </section>
      : null }
      {/* End Faq about sections */}

      {error == "" ?
        <section className="mt-40 border-top-light pt-40 layout-pb-lg">
          <div className="container">
            <div className="row y-gap-40 justify-between">
              <div className="col-xl-3">
                <h3 className="text-22 fw-500">Guest reviews</h3>
                <ReviewProgress2 
                  reviewDetails={ reviewDetails }
                />
                {/* End review with progress */}
              </div>
              {/* End col-xl-3 */}

              <div className="col-xl-8">
                <DetailsReview2 
                  textReviews = { "reviews_list" in reviewDetails? reviewDetails?.reviews_list : [] }
                  textReviewCount = { "total_text_reviews" in reviewDetails? reviewDetails?.total_text_reviews : 0 }
                  vehicleId = {id}
                />
              </div>
              {/* End col-xl-8 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
          {/* End container */}
        </section>
      : null }
      {/* End Review section */}

      {/* <section className="mt-40 border-top-light pt-40 layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-xl-3">
              <div className="row">
                <div className="col-auto">
                  <h3 className="text-22 fw-500">Leave a Reply</h3>
                  <p className="text-15 text-dark-1 mt-5">
                    Your email address will not be published.
                  </p>
                </div>
              </div> */}
              {/* End .row */}

              {/* <ReplyFormReview2 /> */}
              {/* End ReplyFormReview */}
            {/* </div> */}
            {/* End .col-xl-3 */}

            {/* <div className="col-xl-8">
              <ReplyForm />
            </div> */}
            {/* End .col-xl-8 */}
          {/* </div> */}
          {/* End .row */}
        {/* </div> */}
        {/* End .container */}
      {/* </section> */}
      {/* End Reply Comment box section */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default dynamic(() => Promise.resolve(TourSingleV1Dynamic), {
  ssr: false,
});
