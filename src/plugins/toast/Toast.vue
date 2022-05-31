<template>
  <div class="toast">
    <div class="box" :class="{ show }">
      <div class="message" v-html="msg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'ToastPlugin',
})
export default class ToastPlugin extends Vue {
  @Prop({
    type: String,
    required: true,
  })
  private readonly message!: string;

  @Prop({
    type: Number,
    default: 5000,
  })
  private readonly time!: number;

  get msg() {
    return this.message
      .split('\n')
      .map((str) => str.trim())
      .filter((str) => str)
      .join('\n');
  }

  private show = false;

  mounted() {
    this.showToast();
  }

  beforeDestroy() {
    this.$el.removeEventListener('transitionend', this.hideTransitionEndListener);
    this.$el.remove();
  }

  private showToast() {
    setTimeout(() => {
      this.show = true;
      this.hideToast();
    });
  }

  private hideToast() {
    setTimeout(() => {
      this.show = false;
      this.$el.addEventListener('transitionend', this.hideTransitionEndListener);
    }, this.time);
  }

  private hideTransitionEndListener() {
    this.$destroy();
  }
}
</script>

<style lang="scss" scoped>
.toast {
  box-sizing: border-box;
  position: absolute;
  z-index: 100000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 0;
}

.box {
  box-sizing: border-box;
  position: absolute;
  top: 50vh;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: calc(100% - 4rem);
  overflow-y: auto;
  padding: 13px 20px 11px;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s;
  background: rgba(0, 0, 0, 0.8);

  &.show {
    opacity: 1;
  }
}

.message {
  box-sizing: border-box;
  white-space: pre-wrap;
  font-weight: bold;
  font-size: 13px;
  text-align: center;
  color: white;
  max-height: calc(100vh - 40px);
}
</style>
