import Dayjs from 'dayjs';

declare global {
  interface Window {
    $dayjs: typeof Dayjs;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $dayjs: typeof Dayjs;
  }
}
