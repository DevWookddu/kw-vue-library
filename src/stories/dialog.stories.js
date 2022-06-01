import KwButton from '../components/KwButton.vue';
import KwApp from '../components/container/KwApp.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'plugins/Dialog',
};

export const Default = () => ({
  components: { KwButton, KwApp },
  template: /* html */ `
    <KwApp>
      <KwButton @click="callConfirm">confirm</KwButton>
      <KwButton @click="callAlert">alert</KwButton>
    </KwApp>
  `,
  methods: {
    async callConfirm() {
      const res = await this.$confirm({
        title: '타이틀',
        message: '메세지',
      });
      action('dialog-button-click')(res);
    },
    async callAlert() {
      const res = await this.$alert({
        title: '타이틀',
        message: '메세지',
      });
      action('dialog-button-click')(res);
    },
  },
});
