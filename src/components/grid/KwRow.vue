<template>
  <div class="kw-row" :class="[elClassName, alignH]">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import KwUi from '../KwUi';

@Component({
  name: 'KwRow',
})
export default class KwRow extends KwUi {
  get elClassName() {
    const { breakpoint, sm, md, lg, cols } = this;
    switch (breakpoint) {
      case 'sm':
        if (sm) return `kw-row-cols-${sm}`;
        break;
      case 'md':
        if (md) return `kw-row-cols-${md}`;
        break;
      case 'lg':
        if (lg) return `kw-row-cols-${lg}`;
        break;
    }
    if (cols) return `kw-row-cols-${cols}`;
    return '';
  }

  @Prop()
  private readonly cols!: number;
  @Prop()
  private readonly sm!: number;
  @Prop()
  private readonly md!: number;
  @Prop()
  private readonly lg!: number;
  @Prop()
  private readonly alignH!: 'start' | 'end' | 'center' | 'around' | 'between';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.kw-row {
  display: flex;
  flex-wrap: wrap;

  &.start {
    justify-content: flex-start;
  }
  &.center {
    justify-content: center;
  }
  &.end {
    justify-content: end;
  }
  &.around {
    justify-content: space-around;
  }
  &.between {
    justify-content: space-between;
  }
}

@for $i from 1 to 13 {
  .kw-row-cols-#{$i} {
    .kw-column {
      flex: 0 0 calc(100% / $i);
    }
  }
}
</style>
