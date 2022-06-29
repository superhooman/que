const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
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
