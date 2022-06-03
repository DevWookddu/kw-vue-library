<template>
  <transition v-on="$listeners" v-on:after-enter="onAfterEnter" :name="from">
    <slot ref="slot" />
  </transition>
</template>

<script lang="ts">
import { IdeComponent } from '../../decorators/IdeComponent';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'KwContainerTransition',
})
@IdeComponent({ description: 'KwContainerTransition Description' })
export default class KwContainerTransition extends Vue {
  @Prop({
    type: String,
    default: 'bottom',
  })
  private readonly from!: 'top' | 'right' | 'bottom' | 'left';

  private onAfterEnter() {
    this.$emit('after-enter');
    const [container] = this.$slots.default || [];
    if (container) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hook = (container?.componentOptions as any)?.afterTransitionEnd;
      typeof hook === 'function' && hook();
    }
  }
}
</script>

<style scoped lang="scss">
.top-enter-active,
.top-leave-active {
  transform: translateY(0);
  transition: transform 0.2s;
}
.top-enter,
.top-leave-to {
  transform: translateY(-100%);
}

.bottom-enter-active,
.bottom-leave-active {
  transform: translateY(0);
  transition: transform 0.2s;
}
.bottom-enter,
.bottom-leave-to {
  transform: translateY(100%);
}
.left-enter-active,
.left-leave-active {
  transform: translateX(-100%);
  transition: transform 0.2s;
}
.left-enter,
.left-leave-to {
  transform: translateX(0);
}
.right-enter-active,
.right-leave-active {
  transform: translateX(100%);
  transition: transform 0.2s;
}
.right-enter,
.right-leave-to {
  transform: translateX(0);
}
</style>
