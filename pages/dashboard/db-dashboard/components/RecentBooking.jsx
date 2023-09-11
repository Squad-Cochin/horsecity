///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                  File for showing the RECENT ENQUIRIES in DASHBORD pages                          //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for showing the recent 5 enquiries
const RecentBooking = (props) => {
  return (
    <div className="overflow-scroll scroll-bar-1 pt-30">
      <table className="table-2 col-12">
        <thead>
          <tr>
            <th>#</th>
            <th>Service Prover Name</th>
            <th>Vehicle Number</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
            <th>Number Of Horses</th>
            <th>Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {row.service_provider_name}
              </td>
              <td className="fw-500">{row.vehicle_number}</td>
              <td>{row.pickup_location}</td>
              <td>{row.drop_location}</td>
              <td>{row.horse}</td>
              <td>
                <div
                  className={`rounded-100 py-4 text-center col-12 text-14 fw-500 bg-
                    ${row.enquiry_status == "CONFIRMED" ? "green" 
                    : "red-3"} text-${row.enquiry_status}`}
                >
                  {row.enquiry_status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBooking;
