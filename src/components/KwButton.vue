<template>
  <button v-on="$listeners" :type="type" class="kw-button" :class="[variant, size, { block }]" :disabled="disabled">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import KwUi from './KwUi';

@Component({
  name: 'KwButton',
})
export default class KwButton extends KwUi {
  @Prop({ type: String, default: 'button' })
  private readonly type!: 'button' | 'submit';

  // 버튼 크기(height 차이)
  // 'md' => height 4.8rem
  // 'lg' => height 5.6rem
  @Prop({ type: String, default: 'md' })
  private readonly size!: 'sm' | 'md' | 'lg';

  // 테마
  // 'priamry' => 파랑
  // 'secondary' => 옅은 그레이
  @Prop({ type: String, default: 'primary' })
  private readonly variant!: 'primary' | 'secondary' | 'transparent';

  @Prop({ type: Boolean, default: false })
  private readonly disabled!: boolean;

  // 블록화 여부
  @Prop({ type: Boolean, default: false })
  private readonly block!: boolean;
}
</script>

<style lang="scss" scoped>
.kw-button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  word-break: keep-all;
  transition: all 0.3s;
  &.block {
    width: 100%;
  }
}

// size
.kw-button {
  &.sm {
    height: 32px;
    min-height: 32px;
    padding: 0 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: bold;
  }
  &.md {
    min-width: 120px;
    height: 48px;
    min-height: 48px;
    padding: 0 12px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.12px;
  }
  &.lg {
    min-width: 120px;
    height: 56px;
    min-height: 56px;
    padding: 0 12px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.12px;
  }
}
// variant
.kw-button {
  &.primary {
    color: white;
    background-color: #42a5f5;
  }
  &.secondary {
    color: rgba(0, 0, 0, 0.8);
    background-color: #ebebeb;
  }
  &.transparent {
    color: rgba(0, 0, 0, 0.56);
    background-color: transparent;
  }
  &:disabled {
    color: rgba(0, 0, 0, 0.24);
    background-color: #fafafa;
    opacity: 1;
  }
}
</style>
