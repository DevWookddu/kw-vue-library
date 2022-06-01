import Vue from 'vue';
import Toast from './Toast.vue';
import './index';

const aliveToasts: Array<Toast> = [];

const ToastPlugin = {
  install(vue: typeof Vue) {
    vue.prototype.$toast = (message: string, time = 3000) => {
      const toastInstance = new Toast({
        propsData: {
          message,
          time,
        },
      });
      let toast;
      while ((toast = aliveToasts.pop())) {
        toast.$destroy();
      }
      aliveToasts.push(toastInstance);
      toastInstance.$mount();
      document.body.appendChild(toastInstance.$el);
    };
  },
};

export default ToastPlugin;
