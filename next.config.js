/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEEPL_AUTH_KEY:'372beb10-6611-0dcd-4fa7-a9afa2dce80e:fx',
    PLAYHT_AUTH_KEY:'5092961abe7940cbb053be3554f5210e',
    PLAYHT_USER_ID:'CDwIWESGJbhDXmUqO17BnhiJdiE2'
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
