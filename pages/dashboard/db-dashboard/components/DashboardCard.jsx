// import { useEffect, useState } from "react";
// import dashboardDataApi from "../../../api/dashboardDataApi";
// const data = [
//   {
//     title: "Pending",
//     amount: "$12,800",
//     description: "Total pending",
//     icon: "/img/dashboard/icons/1.svg",
//   },
//   {
//     title: "Earnings",
//     amount: "$14,200",
//     description: "Total earnings",
//     icon: "/img/dashboard/icons/2.svg",
//   },
//   {
//     title: "Bookings",
//     amount: "$8,100",
//     description: "Total hotel bookings",
//     icon: "/img/dashboard/icons/3.svg",
//   },
//   {
//     title: "Services",
//     amount: "22,786",
//     description: "Total bookable services",
//     icon: "/img/dashboard/icons/4.svg",
//   },
// ];

const DashboardCard = (props) => {
  return (
    <div className="row y-gap-30">
      {/* {data.map((item, index) => ( */}
        <div key={1} className="col-xl-3 col-md-6">
          <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <div className="row y-gap-20 justify-between items-center">
              <div className="col-auto">
                <div className="fw-500 lh-14">Pending</div>
                <div className="text-26 lh-16 fw-600 mt-5">{props.data?.total_pending_amount}</div>
                <div className="text-15 lh-14 text-light-1 mt-5">
                  Total pending 
                </div>
              </div>
              <div className="col-auto">
                <img src="/img/dashboard/icons/1.svg" alt="icon" />
              </div>
            </div>
          </div>
        </div>

        <div key={2} className="col-xl-3 col-md-6">
          <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <div className="row y-gap-20 justify-between items-center">
              <div className="col-auto">
                <div className="fw-500 lh-14">Paid</div>
                <div className="text-26 lh-16 fw-600 mt-5">{props.data?.total_paid_amount}</div>
                <div className="text-15 lh-14 text-light-1 mt-5">
                  Total Paid
                </div>
              </div>
              <div className="col-auto">
                <img src="/img/dashboard/icons/2.svg" alt="icon" />
              </div>
            </div>
          </div>
        </div>

        <div key={3} className="col-xl-3 col-md-6">
          <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <div className="row y-gap-20 justify-between items-center">
              <div className="col-auto">
                <div className="fw-500 lh-14">Confirmed Bookings</div>
                <div className="text-26 lh-16 fw-600 mt-5">{props.data?.total_booking}</div>
                <div className="text-15 lh-14 text-light-1 mt-5">
                  Total Bookings
                </div>
              </div>
              <div className="col-auto">
                <img src="/img/dashboard/icons/3.svg" alt="icon" />
              </div>
            </div>
          </div>
        </div>

        <div key={4} className="col-xl-3 col-md-6">
          <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <div className="row y-gap-20 justify-between items-center">
              <div className="col-auto">
                <div className="fw-500 lh-14">Not Completed Trips</div>
                <div className="text-26 lh-16 fw-600 mt-5">{props.data?.total_pending_booking}</div>
                <div className="text-15 lh-14 text-light-1 mt-5">
                  Not Completed Trips
                </div>
              </div>
              <div className="col-auto">
                <img src="/img/dashboard/icons/4.svg" alt="icon" />
              </div>
            </div>
          </div>
        </div>
      {/* ))} */}
    </div>
  );
};

export default DashboardCard;
