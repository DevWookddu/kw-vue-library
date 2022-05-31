import { action } from '@storybook/addon-actions';

import KwContainer from '../components/container/KwContainer.vue';

export default {
  title: 'KwContainer',
};

export const Default = () => ({
  components: { KwContainer },
  template: /* html */ `
    <KwContainer use-header-shadow class="main" @flick-move="onFlickMove" @flick-end="onFlickEnd">
      <template #header>
        Header
      </template>
      <template #body>
        <div style="height: 700px">Body</div>
      </template>
      <template #footer>
        Footer
      </template>
      <template #containers>
        <KwContainer use-header-shadow flick-from="left" class="sub" :el-style="{ background: 'grey' }">
          <template #body>
            <div style="height: 700px">zzz</div>
          </template>
        </KwContainer>
      </template>
    </KwContainer>
  `,
  methods: {
    action: action('clicked'),
    onFlickMove({ moveX }) {
      this.flickX = moveX;
    },
    onFlickEnd({ leftOrRight }) {
      if (leftOrRight === 'right') {
        this.flickX = 0;
      } else {
        this.flickX = null;
      }
    },
  },
  data() {
    return {
      flickX: null,
    };
  },
});
