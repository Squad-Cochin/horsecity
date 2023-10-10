///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//              File using for showing the subscribe form in HOME page                               //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for showing subscribe option in footer
const Subscribe = () => {
  return (
    <div className="single-field relative d-flex justify-end items-center pb-30">
      <input
        className="bg-white rounded-8"
        type="email"
        placeholder="Your Email"
        required
      />
      <button
        type="submit"
        className="absolute px-20 h-full text-15 fw-500 underline text-dark-1"
      >
        Subscribe
      </button>
    </div>
  );
};

export default Subscribe;
