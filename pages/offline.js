// components/OfflinePage.js
import React from 'react';
import Head from "next/head";

const OfflinePage = () => {
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
      <h1>Offline Page</h1>
      <p>You are currently offline. Please check your internet connection.</p>
    </>
  );
};

export default OfflinePage;
