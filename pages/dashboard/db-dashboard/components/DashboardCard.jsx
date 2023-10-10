///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                  File for showing the past details of customer in DASHBORD pages                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for showing the past details of customer
const DashboardCard = (props) => {
  return (
    <div className="row y-gap-30">
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
    </div>
  );
};

export default DashboardCard;
