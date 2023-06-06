//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                    BASIC CONFIGURATION OF NEXT JS.                                   //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tripadvisor.com',
      },
    ],
  },
};
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.tripadvisor.com',
        },
      ],
    },
};

module.exports = nextConfig;
