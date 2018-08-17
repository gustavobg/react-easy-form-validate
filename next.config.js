const nextConfig = {
  webpack: (config) => {
    console.log(config);
    config.module.rules.push(
      {
        test: /\.(md|mdx)$/,
        use: ['catalog/loader', 'raw-loader'],
      },
    );
    return config;
  },
};

module.exports = nextConfig;
