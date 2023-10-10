///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                   File using for showing ratings of a product in DETAILS page                     //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

// Function for showing guest reviews
const ReviewProgress2 = (props) => {
  const [ star_rating, setStarRating ] = useState({})

  useEffect(()=>{
    setStarRating( "star_rating" in props.reviewDetails ? props.reviewDetails.star_rating : {})
  },[props])
  const reviewProgressContent = [
    {
      id: 1,
      reviewReason: "Excellent",
      progressPercent: "rating_five" in star_rating ? star_rating.rating_five : null,
    },
    {
      id: 2,
      reviewReason: "Very good",
      progressPercent: "rating_four" in star_rating ? star_rating.rating_four : null,
    },
    {
      id: 3,
      reviewReason: "Average",
      progressPercent: "rating_three" in star_rating ? star_rating.rating_three : null,
    },
    {
      id: 4,
      reviewReason: "Poor",
      progressPercent: "rating_two" in star_rating ? star_rating.rating_two : null,
    },
    { 
      id: 5, 
      reviewReason: "Terrible",
      progressPercent: "rating_one" in star_rating ? star_rating.rating_one : null 
    },
  ];
  return (
    <>
    <div className="d-flex items-center mt-20">
        <div className="flex-center bg-blue-1 rounded-4 size-70 text-22 fw-600 text-white">
          {"overall_company_rating" in props?.reviewDetails 
            ? props?.reviewDetails?.overall_company_rating 
            : "- -"
          }
        </div>
        <div className="ml-20">
          <div className="text-16 text-dark-1 fw-500 lh-14">Review for supplier</div>
          <div 
            className="text-15 text-light-1 lh-14 mt-4"
          >
            {"total_company_reviews" in props?.reviewDetails 
              ? props?.reviewDetails?.total_company_reviews 
              :  0
            } reviews
          </div>
        </div>
      </div>
      <div className="d-flex items-center mt-20">
        <div className="flex-center bg-blue-1 rounded-4 size-70 text-22 fw-600 text-white">
          {"overall_vehicle_rating" in props?.reviewDetails 
            ? props?.reviewDetails?.overall_vehicle_rating 
            :  "- -"
          }
        </div>
        <div className="ml-20">
          <div className="text-16 text-dark-1 fw-500 lh-14">Review for vehicle</div>
          <div 
            className="text-15 text-light-1 lh-14 mt-4"
          >
            {"total_vehicle_reviews" in props?.reviewDetails 
              ? props?.reviewDetails?.total_vehicle_reviews 
              : 0
            } reviews
          </div>
        </div>
      </div>
      {/* End .d-flex */}

      <div className="row y-gap-20 pt-20">
        {reviewProgressContent.map((item) => (
          <div className="col-12" key={item.id}>
            <div className="d-flex items-center justify-between">
              <div className="text-15 fw-500">{item.reviewReason}</div>
              {/* <div className="text-15 text-light-1">{item.ratings}</div> */}
            </div>
            <div className="progressBar mt-10">
            <div className="progressBar__bg bg-blue-2" />
              <div
                   className="progressBar__bar bg-yellow-1"
                style={{ width: item.progressPercent }}
              />
            </div>
          </div>
        ))}

        {/* End .col-md-4 */}
      </div>
      {/* End .row */}
    </>
  );
};

export default ReviewProgress2;
