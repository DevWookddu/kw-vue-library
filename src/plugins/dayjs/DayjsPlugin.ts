import Dayjs from 'dayjs';
import Vue from 'vue';
export * from './index';

const DayjsPlugin = {
  install(vue: typeof Vue) {
    (vue.prototype.$dayjs as typeof Dayjs) = Dayjs;
  },
};

export default DayjsPlugin;
