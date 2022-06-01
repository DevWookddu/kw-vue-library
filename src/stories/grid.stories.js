import KwRow from '../components/grid/KwRow.vue';
import KwColumn from '../components/grid/KwColumn.vue';
import KwApp from '../components/container/KwApp.vue';
import './grid.stories.scss';

export default {
  title: 'grid',
};

export const Default = () => ({
  components: { KwApp, KwRow, KwColumn },
  template: /* html */ `
    <KwApp class="grid-story-app">
      <KwRow cols="4">
        <KwColumn sm="6">column</KwColumn>
        <KwColumn sm="7" offset="1">column</KwColumn>
      </KwRow>
      <KwRow align-h="center">
        <KwColumn cols="3">column</KwColumn>
        <KwColumn cols="3">column</KwColumn>
      </KwRow>
    </KwApp>
  `,
});
