module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: [
          ['react-native-paper/babel'],
          [
            'module:react-native-dotenv',
            {
              moduleName: 'react-native-dotenv',
              verbose: false,
            },
          ],
        ],
      },
    },
  };
};
