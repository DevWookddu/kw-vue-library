import KwApp from '../components/container/KwApp.vue';
import KwSelect from '../components/input/KwSelect.vue';

export default {
  title: 'components/KwSelect',
};

export const Default = () => ({
  components: { KwSelect, KwApp },
  template: /* html */ `
    <KwApp>
      <KwSelect v-model="model" :options="options" />
    </KwApp>
  `,
  data() {
    return {
      model: '',
      options: [
        {
          value: 'apple',
          label: '사과',
        },
        {
          value: 'grape',
          label: '포도',
        },
      ],
    };
  },
});
