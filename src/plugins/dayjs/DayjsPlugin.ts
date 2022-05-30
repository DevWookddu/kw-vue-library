import Dayjs from 'dayjs';
import Vue from 'vue';
import './index';

const DayjsPlugin = {
  install(vue: typeof Vue) {
    (vue.prototype.$dayjs as typeof Dayjs) = Dayjs;
  },
};

export default DayjsPlugin;
