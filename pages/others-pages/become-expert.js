///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                                 File for showing PARTNERS pages                                   //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import dynamic from "next/dynamic";
import CallToActions from "../../components/common/CallToActions";
import Seo from "../../components/common/Seo";
import DefaultHeader from "../../components/header/default-header";
import DefaultFooter from "../../components/footer/default";
import HowWorks from "../../components/block/HowWorks";
import Faq from "../../components/faq/Faq";
import Link from "next/link";

// Function for showing partners page
const BecomeExpert = () => {
  return (
    <>
      <Seo pageTitle="Become Expert" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">How does it work?</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 justify-between pt-40">
            <HowWorks />
            <div className="mt-20">
              <Link
                className=" button -dark-1 px-30 fw-400 text-14 bg-blue-1 h-50 text-white"
                href="/others-pages/signup"
              >
                Become An Expert
              </Link>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End how works Section */}

      
      {/* End about section block */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Frequently Asked Questions
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 justify-center pt-40 sm:pt-20">
            <div className="col-xl-8 col-lg-10">
              <div
                className="accordion -simple row y-gap-20 js-accordion"
                id="Faq1"
              >
                <Faq />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End faq section block */}

      <DefaultHeader />
      {/* End Header 1 */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(BecomeExpert), { ssr: false });
