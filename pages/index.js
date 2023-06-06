//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                            LISTING PAGE DISPLAY THROUGH THIS COMPONENT.                              //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////


import TestDesign1 from "./designs/TestDesign1/TestDesign1";
import Head from "next/head";
const Home = () => {
  return (
    <>
      <Head>
        <title>Horscity</title>
        <meta
        name="description"
        content="Check out the transfer Detail Page..."
        key="desc"
        />
      </Head>
      
      <TestDesign1 />
    </>
  );
};

export default Home;

