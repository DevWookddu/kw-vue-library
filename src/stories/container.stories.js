import KwContainer from '../components/container/KwContainer.vue';
import KwApp from '../components/container/KwApp.vue';

export default {
  title: 'components/KwContainer',
};

export const Default = () => ({
  components: { KwContainer, KwApp },
  template: /* html */ `
    <KwApp app-max-width="800px">
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
    </KwApp>
  `,
});

export const UseSnap = () => ({
  components: { KwContainer, KwApp },
  template: /* html */ `
    <KwApp>
      <KwContainer use-header-shadow class="main">
        <template #header>
          Header
        </template>
        <template #body>
          <div style="height: 1000px;">마우스 드래그 또는 터치드래그시 인터랙션</div>
        </template>
        <template #footer>
          Footer
        </template>
        <template #containers>
          <KwContainer use-header-shadow flick-from="left" class="sub" :el-style="{ background: 'grey' }">
            <template #body>
              <div style="height: 700px">height 700px</div>
            </template>
          </KwContainer>
        </template>
      </KwContainer>
    </KwApp>
  `,
});
