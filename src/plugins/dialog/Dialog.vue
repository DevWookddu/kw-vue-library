<template>
  <div v-show="show" class="dialog">
    <div class="dialog-container">
      <div v-if="title" class="dialog-title">
        {{ title }}
      </div>
      <div class="dialog-body">
        {{ message }}
      </div>
      <div class="dialog-buttons" :class="type">
        <kw-button v-if="type === 'confirm'" variant="secondary" @click="clickButton('cancel')">
          {{ cancelText }}
        </kw-button>
        <kw-button @click="clickButton('ok')">{{ okText }}</kw-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DialogParam } from './';

type Resolve = (type: string) => void;

@Component({
  name: 'Dialog',
})
export default class Dialog extends Vue {
  private show = false;
  private title = '';
  private message = '';
  private type: 'alert' | 'confirm' = 'alert';
  private cancelText = '취소';
  private okText = '확인';
  private resolve: Resolve | null = null;

  public openDialog(param: DialogParam, resolve: Resolve) {
    this.title = param.title || '';
    this.message = param.message;
    this.type = param.type;
    this.cancelText = param.cancelText || '취소';
    this.okText = param.okText || '확인';
    this.show = true;
    this.resolve = resolve;
  }

  private clickButton(type: 'cancel' | 'ok') {
    this.resolve && this.resolve(type);
    this.show = false;
  }
}
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.48);
}

.dialog-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 240px;
  width: calc(100% - 40px);
  max-height: calc(100% - 40px);
  background-color: white;
  padding: 16px 20px;
  border-radius: 10px;
  word-break: break-all;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
}

.dialog-title {
  padding-top: 10px;
  padding-bottom: 8px;
  font-weight: bold;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
}

.dialog-body {
  overflow-y: auto;
}

.dialog-buttons {
  display: flex;
  margin-top: 20px;

  .kw-button {
    flex: 1;
  }

  &.confirm {
    .kw-button:nth-child(2) {
      margin-left: 8px;
    }
  }
}
</style>
