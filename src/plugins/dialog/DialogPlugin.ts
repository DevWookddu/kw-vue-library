import Vue from 'vue';
import { DialogFunc, DialogParam } from '.';
import Dialog from './Dialog.vue';

const instance = new Dialog();
instance.$mount();
document.body.appendChild(instance.$el);

const showDialog = (param: DialogParam) => {
  return new Promise<string>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (instance as any).openDialog(param, resolve);
  });
};

const confirm: DialogFunc = (param) => {
  return showDialog({
    ...param,
    type: 'confirm',
  });
};

const alert: DialogFunc = (param) => {
  return showDialog({
    ...param,
    type: 'alert',
  });
};

const DialogPlugin = {
  install(vue: typeof Vue) {
    window.$confirm = confirm;
    window.$alert = alert;
    vue.prototype.$confirm = confirm;
    vue.prototype.$alert = alert;
  },
};

export default DialogPlugin;
