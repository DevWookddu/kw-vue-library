import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ExampleComponent from '../components/ExampleComponent.vue';

export default {
  title: 'components/Example',
};

export const withText = () => ({
  components: { ExampleComponent },
  template: /* html */ `<ExampleComponent @click="action">withText</ExampleComponent>`,
  methods: { action: action('clicked') },
});

export const withJSX = () => ({
  render() {
    return <ExampleComponent onClick={linkTo('Button', 'With Some Emoji')}>withJsx</ExampleComponent>;
  },
});

export const withSomeEmoji = () => ({
  components: { ExampleComponent },
  template: '<ExampleComponent>😀 😎 👍 💯</ExampleComponent>',
});
