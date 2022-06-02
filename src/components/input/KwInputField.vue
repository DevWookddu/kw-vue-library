<template>
  <div class="kw-input-field">
    <input
      class="input-field"
      :type="type"
      :value="model"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      @input="onInput($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Component, ModelSync, Prop } from 'vue-property-decorator';
import KwUi from '../KwUi';

@Component({
  name: 'KwInputField',
})
export default class KwInputField extends KwUi {
  @ModelSync('value', 'input')
  private model!: unknown;

  @Prop({ type: String, default: 'text' })
  private type!: 'text' | 'password' | 'number';

  @Prop()
  private placeholder!: string;

  @Prop()
  private maxlength!: string | number;

  @Prop()
  private disabled!: boolean;

  private onInput(value: string) {
    this.model = value;
  }
}
</script>

<style lang="scss" scoped>
.kw-input-field {
  position: relative;
}

.prefix-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.24);
}

.input-field {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  padding: 0 18px;
  font-size: 16px;
  font-weight: 600;
  border: 0;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.8);
  background-color: #f5f5f5;

  &.has-prefix-icon {
    padding-left: 42px;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.24);
    font-weight: normal;
  }

  &:disabled {
    opacity: 1;
  }

  &.disabled-lighten:disabled {
    color: rgab(0, 0, 0, 0.16);
    background-color: #fafafa;
  }
}

.suffix-icon {
  position: absolute;
  top: 50%;
  right: 0;
  border: 0;
  padding: 12px;
  opacity: 0.3;
  background: none;
  transform: translateY(-50%);
}
</style>
