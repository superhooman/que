const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
	PROD_URL: process.env.PROD_URL,
	NODE_ENV: process.env.NODE_ENV,
  },
  rewrites() {
    return [
	    {
	      source: '/bee.js',
	      destination: 'https://cdn.splitbee.io/sb.js',
	    },
	    {
	      source: '/_hive/:slug',
	      destination: 'https://hive.splitbee.io/:slug',
	    },
	  ];
  },
};

module.exports = nextConfig;
