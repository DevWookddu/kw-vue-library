<template>
  <div class="kw-app">
    <slot />
  </div>
</template>

<script lang="ts">
import { IdeComponent } from '@/decorators/IdeComponent';
import { Component, Prop, Provide, ProvideReactive, Vue } from 'vue-property-decorator';

@Component({
  name: 'KwApp',
})
@IdeComponent({ description: 'IdeComponent Description' })
export default class KwApp extends Vue {
  @Prop()
  @Provide()
  private appMaxWidth!: string | number;

  @Prop({ default: 475 })
  private smWidth!: number;

  @Prop({ default: 768 })
  private mdWidth!: number;

  @ProvideReactive()
  private vw = 0;

  @ProvideReactive()
  private breakpoint = 'sm';

  created() {
    this.vw = window.innerWidth;
    window.addEventListener('resize', () => {
      const vw = window.innerWidth;
      this.vw = vw;
      if (vw <= this.smWidth) {
        this.breakpoint = 'sm';
      } else if (vw <= this.mdWidth) {
        this.breakpoint = 'md';
      } else {
        this.breakpoint = 'lg';
      }
    });
  }
}
</script>

<style scoped lang="scss">
.kw-app {
  position: fixed;
  width: 100vw;
  height: 100%;
}
</style>
