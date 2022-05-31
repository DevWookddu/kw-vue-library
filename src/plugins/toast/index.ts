declare module 'vue/types/vue' {
  interface Vue {
    $toast: (message: string, time: number) => void;
  }
}
