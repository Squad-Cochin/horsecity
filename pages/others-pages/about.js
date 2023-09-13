///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                    File for showing about the team in WHO WE ARE pages                            //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import dynamic from "next/dynamic";
import CallToActions from "../../components/common/CallToActions";
import Seo from "../../components/common/Seo";
import DefaultHeader from "../../components/header/default-header";
import DefaultFooter from "../../components/footer/default";
import Block1 from "../../components/about/Block1";
import Counter from "../../components/counter/Counter";
import Team1 from "../../components/team/Team1";

// Function for showing about the team
const About = () => {
  return (
    <>
      <Seo pageTitle="About" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <section className="layout-pt-md">
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <Block1 />
          </div>
        </div>
      </section>
      {/* End about block section */}

      <section className="pt-60">
        <div className="container">
          <div className="border-bottom-light pb-40">
            <div className="row y-gap-30 justify-center text-center">
              <Counter />
            </div>
          </div>
        </div>
      </section>
      {/* End counter Section */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Our Team</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className=" pt-40 js-section-slider">
            <div className="item_gap-x30">
              <Team1 />
            </div>
          </div>
          {/* End  js-section-slider */}
        </div>
        {/* End container */}
      </section>
      {/* End team section */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(About), { ssr: false });