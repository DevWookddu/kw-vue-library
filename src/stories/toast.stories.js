import KwButton from '../components/KwButton.vue';
import KwApp from '../components/container/KwApp.vue';

export default {
  title: 'plugins/Toast',
};

export const Default = () => ({
  components: { KwButton, KwApp },
  template: /* html */ `
    <KwApp>
      <KwButton @click="callToast('toast')">this.$toast('toast')</KwButton>
      <KwButton @click="callToast('Hello')">this.$toast('Hello')</KwButton>
    </KwApp>
  `,
  methods: {
    callToast(msg) {
      this.$toast(msg);
    },
  },
});
