const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const isNodeEnvProduction = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule('load-html')
      .test(/\.load.html$/)
      .use('html-loader')
      .loader('html-loader')
      .end();
  },
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 8501,
    https: false,
  },
  productionSourceMap: !isNodeEnvProduction,
  css: {
    extract: isNodeEnvProduction,
    sourceMap: !isNodeEnvProduction,
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/index.scss";
        `,
      },
    },
  },
  pluginOptions: {
    storybook: {
      allowedPlugins: ['define'],
    },
  },
});
