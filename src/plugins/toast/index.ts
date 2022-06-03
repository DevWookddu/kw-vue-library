// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $toast: (message: string, time: number) => void;
  }
}
