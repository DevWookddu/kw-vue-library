import KwButton from '../components/KwButton.vue';
import KwApp from '../components/container/KwApp.vue';

export default {
  title: 'components/KwButton',
};

export const Default = () => ({
  components: { KwApp, KwButton },
  template: /* html */ `
    <KwApp>
      <KwButton>KwButton</KwButton>
      <KwButton variant="secondary">KwButton</KwButton>
      <KwButton variant="transparent">KwButton</KwButton>
    </KwApp>
  `,
});

export const size = () => ({
  components: { KwApp, KwButton },
  template: /* html */ `
    <KwApp>
      <KwButton size="sm">sm</KwButton>
      <KwButton size="md">md</KwButton>
      <KwButton size="lg">lg</KwButton>
</KwApp>
  `,
});

export const block = () => ({
  components: { KwApp, KwButton },
  template: /* html */ `
    <KwApp>
      <KwButton size="sm" block style="margin-bottom: 8px">sm</KwButton>
      <KwButton size="md" block style="margin-bottom: 8px">md</KwButton>
      <KwButton size="lg" block style="margin-bottom: 8px">lg</KwButton>
    </KwApp>
  `,
});
