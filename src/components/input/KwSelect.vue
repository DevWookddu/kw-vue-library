<template>
  <div class="kw-select">
    <select class="select-button" :value="model" :disabled="disabled" @change="onChange($event.target.value)">
      <option disabled selected>선택</option>
      <option
        v-for="option in options"
        :key="option[valueKey]"
        :value="option[valueKey]"
        :selected="model === option[valueKey]"
      >
        {{ option[labelKey] }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, ModelSync, Prop, Watch } from 'vue-property-decorator';
import KwUi from '../KwUi';

@Component({
  name: 'KwSelect',
})
export default class KwSelect extends KwUi {
  @ModelSync('value', 'change')
  private model!: unknown;

  @Prop({ default: 'string' })
  private type!: 'string' | 'number' | 'boolean';

  @Prop()
  private disabled!: boolean;

  @Prop({ default: 'value' })
  private valueKey!: string;

  @Prop({ default: 'label' })
  private labelKey!: string;

  @Prop()
  private options!: Array<Record<string, unknown>>;

  @Watch('model')
  private watchModel() {
    this.$forceUpdate();
  }

  private onChange(value: string) {
    switch (this.type) {
      case 'string':
        this.model = value;
        break;
      case 'number':
        this.model = Number(value);
        break;
    }
    (document.activeElement as HTMLInputElement)?.blur();
  }
}
</script>

<style lang="scss" scoped>
.kw-select {
  position: relative;
}

.select-button {
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

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;

  appearance: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.24);
    font-weight: normal;
  }

  &:disabled {
    opacity: 1;
  }

  &:focus {
    background-image: linear-gradient(45deg, green 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, green 50%), linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em, calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
    border-color: green;
    outline: 0;
  }
}
</style>
