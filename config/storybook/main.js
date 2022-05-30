module.exports = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-links', '@storybook/addon-actions/register'],
  core: {
    builder: 'webpack5',
  },
};
