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
import getAboutUsApi from "../api/aboutUsApi";
import { usePathname } from 'next/navigation'
import { useEffect,useState } from "react";
// Function for showing about the team
const About = () => {

  const [ aboutUsData, setAboutUs ] =useState([])

  const pathname = usePathname()
  const parts = pathname.split('/');
  const desiredPart = parts[parts.length - 1];

  useEffect(() => {
    initialLoad();
  }, []);
  async function initialLoad(){
     const aboutUsData= await getAboutUsApi(desiredPart);
    if(aboutUsData?.code === 200){
      setAboutUs(aboutUsData?.data)
    }else{

    }
    
  }
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
            <Block1 aboutUs={aboutUsData[0]}/>
          </div>
        </div>
      </section>
      {/* End about block section */}

      <section className="pt-60">
        <div className="container">
          <div className="border-bottom-light pb-40">
            <div className="row y-gap-30 justify-center text-center">
              {/* <Counter /> */}
            </div>
          </div>
        </div>
      </section>
      {/* End counter Section */}

      {/* End team section */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(About), { ssr: false });
