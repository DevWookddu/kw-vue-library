import { action } from '@storybook/addon-actions';

import KwContainer from '../components/container/KwContainer.vue';

export default {
  title: 'KwContainer',
};

export const Default = () => ({
  components: { KwContainer },
  template: /* html */ `
    <KwContainer use-header-shadow class="main">
      <template #header>
        Header 스크롤시 그림자 생성
      </template>
      <template #body>
        <div style="height: 1000px">Body</div>
      </template>
      <template #footer>
        Footer 스크롤 존재시 그림자 생성
      </template>
    </KwContainer>
  `,
});

export const UseSnap = () => ({
  components: { KwContainer },
  template: /* html */ `
    <KwContainer use-header-shadow class="main">
      <template #header>
        Header
      </template>
      <template #body>
        <div style="height: 1000px">마우스 드래그 또는 터치드래그시 인터랙션</div>
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
  },
});
