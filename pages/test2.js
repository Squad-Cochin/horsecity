import Head from "next/head";
import Test2 from "./components/pageComponents/Test2/Test2";

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
      <Test2 />
    </>
  );
};

export default Home;
