module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};