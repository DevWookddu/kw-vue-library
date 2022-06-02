// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue';

export interface DialogParam {
  title?: string;
  message: string;
  type: 'alert' | 'confirm';
  cancelText?: string;
  okText?: string;
}

export type DialogFunc = (param: Omit<DialogParam, 'type'>) => Promise<string>;

declare global {
  interface Window {
    $alert: DialogFunc;
    $confirm: DialogFunc;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $alert: DialogFunc;
    $confirm: DialogFunc;
  }
}
