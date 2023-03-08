/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_AUTH_KEY:'1c374654-4c5e-e24f-4901-ecaed0a3a479:fx'
  },
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
      // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
  reactStrictMode: true,
}

module.exports = nextConfig
