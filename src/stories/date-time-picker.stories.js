import KwApp from '../components/container/KwApp.vue';
import KwDateTimePicker from '../components/KwDateTimePicker.vue';

export default {
  title: 'components/KwDateTimePicker',
};

export const Single = () => ({
  components: { KwDateTimePicker, KwApp },
  template: /* html */ `
    <KwApp>
      <KwDateTimePicker type="single" v-model="model" />
    </KwApp>
  `,
  data() {
    return {
      model: [],
    };
  },
});

export const Period = () => ({
  components: { KwDateTimePicker, KwApp },
  template: /* html */ `
    <KwApp>
      <KwDateTimePicker type="period" v-model="model" />
    </KwApp>
  `,
  data() {
    return {
      model: [],
    };
  },
});

export const useTime = () => ({
  components: { KwDateTimePicker, KwApp },
  template: /* html */ `
    <KwApp>
      <KwDateTimePicker type="period" v-model="model" use-time />
    </KwApp>
  `,
  data() {
    return {
      model: [],
    };
  },
});
