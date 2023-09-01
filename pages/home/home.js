import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
import Header from "../../components/header/header";
import Hero10 from "../../components/hero/hero-10";
import Footer8 from "../../components/footer/footer-8";
import BlockGuide from "../../components/block/BlockGuide";
import AppBanner from "../../components/home/home-10/AppBanner";
import TestimonialRating from "../../components/home/home-10/TestimonialRating";
import Testimonial from "../../components/home/home-10/Testimonial";

const home = () => {
  return (
    <>
      <Seo pageTitle="Home" />
      {/* End Page Title */}

      <Header />
      {/* End Header 5 */}

      <Hero10 />
      {/* End Hero 5 */}

      <section className="layout-pt-sm layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Why Choose Us</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 justify-between pt-50">
            <BlockGuide />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* Why choose Block Guide Section */}

      <section className="layout-pt-lg layout-pb-lg bg-dark-3">
        <div className="container">
          <div className="row y-gap-40 justify-between text-white">
            <div className="col-xl-5 col-lg-6">
              <TestimonialRating />
            </div>
            {/* End .col */}

            <div className="col-lg-6">
              <Testimonial />
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End testimonial and brand sections Section */}

      <AppBanner />
      {/* App Banner Section */}

      <Footer8 />
      {/* End Footer Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(home), { ssr: false });
