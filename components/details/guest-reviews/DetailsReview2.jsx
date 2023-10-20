///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                   File using for showing reviews of each person in DETAILS page                   //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import Image from "next/image";
import { useEffect, useState } from "react";
import AllReviewsApi from "../../../pages/api/allReviewsApi";

// Function for showing detail review
const DetailsReview2 = (props) => {
  const [ reviews, setReviews ] = useState([]);
  const [ showMoreButton, setShowMoreButton ] = useState(true);
  useEffect(()=>{
    setReviews(props?.textReviews)
    if(props?.textReviewCount > 3){
      setShowMoreButton(true)
    }else{
      setShowMoreButton(false)
    }
  },[props])

  async function showMore(id){
    let allReview = await AllReviewsApi(id);
    if(allReview?.code === 200){
      setReviews(allReview?.data)
    }
    setShowMoreButton(false)
  }

  async function showLess(){
    let lessReviews = reviews.slice(0, 3);
    setReviews(lessReviews)
    setShowMoreButton(true)
  }

  return (
    <div className="row y-gap-40">
      {reviews?.map((item)=>{
        return(
        <div key={item.id} className="col-lg-12">
          <div className="row x-gap-20 y-gap-20 items-center">
            <div className="col-auto">
              <div className="col-auto">
                <div className="user-name">{item.customer_name.split('')[0]}</div>
              </div>
            </div>
            <div className="col-auto">
              <div className="fw-500 lh-15">{item.customer_name}</div>
              <div className="text-14 text-light-1 lh-15">{item.created_at}</div>
            </div>
          </div>
          {/* End .row */}

          <p className="text-15 text-dark-1 mt-10">
            {item.review}{" "}
          </p>
        </div>
      )})}
      {/* End .col */}

      {showMoreButton && props?.textReviewCount > 3 ?
      <div className="col-auto">
        <button 
          className="button -md -outline-blue-1 text-blue-1"
          onClick={()=>{showMore(props.vehicleId)}}
        >
          Show all {props?.textReviewCount} reviews{" "}
          <div className="icon-arrow-top-right ml-15"></div>
        </button>
      </div> 
      : null }
      {!showMoreButton && props?.textReviewCount > 3 ?
      <div className="col-auto">
        <button 
          className="button -md -outline-blue-1 text-blue-1"
          onClick={()=>{showLess()}}
        >
          Show less{" "}
          <div className="icon-arrow-top-right ml-15"></div>
        </button>
      </div> 
      : null }
      {/* End .col-auto */}
    </div>
  );
};

export default DetailsReview2;