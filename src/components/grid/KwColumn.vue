<template>
  <div :class="elClassName">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import KwUi from '../KwUi';

@Component({
  name: 'KwColumn',
})
export default class KwColumn extends KwUi {
  get elClassName() {
    const { breakpoint, cols, sm, md, lg, offset, offsetSm, offsetMd, offsetLg } = this;
    let colsClass = ``;
    let offsetClass = ``;
    switch (breakpoint) {
      case 'sm':
        if (sm) colsClass = `kw-column-${sm}`;
        break;
      case 'md':
        if (md) colsClass = `kw-column-${md}`;
        break;
      case 'lg':
        if (lg) colsClass = `kw-column-${lg}`;
        break;
    }
    switch (breakpoint) {
      case 'sm':
        if (offsetSm) offsetClass = `kw-column-offset-${offsetSm}`;
        break;
      case 'md':
        if (offsetMd) offsetClass = `kw-column-offset-${offsetMd}`;
        break;
      case 'lg':
        if (offsetLg) offsetClass = `kw-column-offset-${offsetLg}`;
        break;
    }
    if (!colsClass && cols) colsClass = `kw-column-${cols}`;
    if (!offsetClass && offset) offsetClass = `kw-column-offset-${offset}`;
    return [colsClass || 'kw-column', offsetClass];
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
  private readonly offset!: number;
  @Prop()
  private readonly offsetSm!: number;
  @Prop()
  private readonly offsetMd!: number;
  @Prop()
  private readonly offsetLg!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.kw-column {
  flex: 1;
}

@for $i from 1 to 13 {
  .kw-column-#{$i} {
    flex: 0 0 percentage($i / 12);
  }
}
@for $i from 1 to 13 {
  .kw-column-offset-#{$i} {
    margin-left: percentage($i / 12);
  }
}
</style>
