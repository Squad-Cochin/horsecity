///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//       File using for showing copyright, currency and language in footer of HOME page              //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for bottam footer
const Copyright = () => {
  return (
    <div className="row justify-between items-center y-gap-10">
      <div className="col-auto">
        <div className="row x-gap-30 y-gap-10">
          <div className="col-auto">
            <div className="d-flex items-center">
              © {new Date().getFullYear()} by
              <a
                href="/"
                className="mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kailplus
              </a>
              all rights reserved.
            </div>
          </div>
          
          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .col */}

      <div className="col-auto">
        <div className="row y-gap-10 items-center">
          <div className="col-auto">
            <div className="d-flex items-center">
              <button className="d-flex items-center text-14 fw-500 text-white mr-10">
                <i className="icon-globe text-16 mr-10" />
                <span className="underline">English (US)</span>
              </button>
              <button className="d-flex items-center text-14 fw-500 text-white mr-10">
                <i className="icon-usd text-16 mr-10" />
                <span className="underline">AED</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default Copyright;
