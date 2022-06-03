import KwApp from '../components/container/KwApp.vue';
import KwInputField from '../components/input/KwInputField.vue';

export default {
  title: 'components/KwInputField',
};

export const Default = () => ({
  components: { KwInputField, KwApp },
  template: /* html */ `
    <KwApp>
      <KwInputField v-model="model" />
    </KwApp>
  `,
  data() {
    return {
      model: '',
    };
  },
});
