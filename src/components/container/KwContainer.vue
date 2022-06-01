<template>
  <div
    class="kw-container"
    :class="[`flick-from-${flickFrom}`, { 'flick-move': isFlickMove }, breakpoint]"
    :style="[elStyle, flickingPosition]"
  >
    <div v-if="$slots['header']" class="header" :class="{ shadow: useHeaderShadow && bodyScrollPosition }">
      <div class="slot-wrapper" :style="{ maxWidth: appMaxWidth }">
        <slot name="header" />
      </div>
    </div>
    <div class="body" ref="refBody">
      <div class="slot-wrapper" :style="{ maxWidth: appMaxWidth }">
        <slot name="body" />
      </div>
    </div>
    <div v-if="$slots['footer']" class="footer" :class="{ shadow: hasBodyScroll }">
      <div class="slot-wrapper" :style="{ maxWidth: appMaxWidth }">
        <slot name="footer" />
      </div>
    </div>
    <div ref="refContainers">
      <slot name="containers" />
    </div>
  </div>
</template>

<script lang="ts">
import { IdeComponent } from '@/decorators/IdeComponent';
import { IdeProp } from '@/decorators/IdeProp';
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import KwUi from '../KwUi';

function getXY(e: Event) {
  if (window.TouchEvent && e instanceof TouchEvent) {
    const [touchInfo] = e.changedTouches;
    return {
      x: touchInfo.clientX,
      y: touchInfo.clientY,
    };
  } else {
    const evt = e as MouseEvent;
    return {
      x: evt.screenX,
      y: evt.screenY,
    };
  }
}

type LeftOrRight = 'left' | 'right' | false;
type UpOrDown = 'up' | 'down' | false;

@Component({
  name: 'KwContainer',
})
@IdeComponent({ description: 'KwContainer Description' })
export default class KwContainer extends KwUi {
  @Ref() private readonly refBody!: HTMLDivElement;
  @Ref() private readonly refContainers!: { children: Array<{ __vue__: Vue }> };

  @Prop({ type: Boolean })
  @IdeProp({ type: 'boolean' })
  private useHeaderShadow!: boolean;

  @Prop({ type: Object })
  private elStyle!: Record<string, unknown>;

  @Prop({ type: String })
  private flickFrom!: 'left' | 'bottom' | 'top' | 'right';

  private bodyScrollDebounceId = 0;
  private bodyScrollHeight = 0;
  private bodyClientHeight = 0;
  private bodyScrollPosition = 0;
  private bodyResizeObserver: ResizeObserver | null = null;

  private isFlickMove = false;
  private flickStartTime = 0;
  private flickStartX = 0;
  private flickStartY = 0;
  private isFlicked = false;
  private moveX = 0;
  private moveY = 0;

  get flickingPosition() {
    const { flickFrom, isFlickMove, isFlicked, moveX, moveY } = this;
    if (!flickFrom) return null;

    switch (flickFrom) {
      case 'left': {
        const flickX = moveX === 0 ? '' : moveX > 0 ? `+ ${moveX}px` : `${moveX}px`;
        if (isFlickMove && Math.abs(moveY) < 52 && Math.abs(moveX) > 52) {
          return { transform: `translate(calc(${isFlicked ? '' : '-100%'} ${flickX}), 0)` };
        } else {
          return { transform: `translate(${isFlicked ? 0 : '-100%'}, 0)` };
        }
      }
      case 'right':
        return { transform: `translate(calc(100% + ${moveX}px), 0)` };
      case 'top':
        return { transform: `translate(0, calc(100% + ${moveY}px)` };
      case 'bottom':
        return { transform: `translate(0, calc(-100% + ${moveY}px)` };
    }

    return null;
  }

  get hasBodyScroll() {
    return this.bodyClientHeight < this.bodyScrollHeight;
  }

  mounted() {
    this.setBodyHeights();
    this.addBodyResizeObserver();
    this.addFlickEventListener();
    this.refBody.addEventListener('scroll', this.bodyScrollListener);
  }

  beforeDestroy() {
    this.removeBodyResizeObserver();
    this.removeFlickEventListener();
    this.refBody.removeEventListener('scroll', this.bodyScrollListener);
  }

  private setBodyHeights() {
    this.bodyScrollHeight = this.refBody?.scrollHeight || 0;
    this.bodyClientHeight = this.refBody?.clientHeight || 0;
  }

  private addBodyResizeObserver() {
    const bro = new ResizeObserver(() => {
      this.setBodyHeights();
    });
    bro.observe(this.refBody);
    this.bodyResizeObserver = bro;
  }

  private removeBodyResizeObserver() {
    this.bodyResizeObserver?.disconnect();
  }

  private bodyScrollListener(e: Event) {
    clearTimeout(this.bodyScrollDebounceId);
    this.bodyScrollDebounceId = setTimeout(() => {
      const { scrollTop, offsetHeight, scrollHeight } = e.target as HTMLDivElement;
      const maxScroll = scrollHeight - offsetHeight;
      const remainScroll = maxScroll - scrollTop;
      const currentYPercent = scrollTop / maxScroll;
      this.bodyScrollPosition = scrollTop;
      this.$emit('scroll', {
        scrollTop,
        remainScroll,
        currentYPercent,
      });
    });
  }

  private addFlickEventListener() {
    this.$el.addEventListener('mousedown', this.elFlickStartListener);
    this.$el.addEventListener('mousemove', this.elFlickMoveListener);
    this.$el.addEventListener('mouseup', this.elFlickEndListener);
    this.$el.addEventListener('touchstart', this.elFlickStartListener);
    this.$el.addEventListener('touchmove', this.elFlickMoveListener);
    this.$el.addEventListener('touchend', this.elFlickEndListener);
  }

  private removeFlickEventListener() {
    this.$el.removeEventListener('mousedown', this.elFlickStartListener);
    this.$el.removeEventListener('mousemove', this.elFlickMoveListener);
    this.$el.removeEventListener('mouseup', this.elFlickEndListener);
    this.$el.removeEventListener('touchstart', this.elFlickStartListener);
    this.$el.removeEventListener('touchmove', this.elFlickMoveListener);
    this.$el.removeEventListener('touchend', this.elFlickEndListener);
  }

  private elFlickStartListener(e: Event) {
    const container = (e.target as HTMLElement).closest('.kw-container');
    if (container === this.$el) {
      const { x, y } = getXY(e);
      this.setIsFlickMove(true);
      this.flickStartX = x;
      this.flickStartY = y;
      this.flickStartTime = new Date().getTime();
    }
  }

  public setIsFlickMove(move: boolean) {
    this.isFlickMove = move;
    this.getFlickContainers().forEach((node) => {
      node.setIsFlickMove(move);
    });
  }

  private getFlickContainers() {
    const children = this.refContainers.children || [];
    const containers = Array.from(children).filter(({ __vue__ }) => {
      const { componentOptions } = __vue__.$vnode;
      return (
        componentOptions?.Ctor.name === 'KwContainer' &&
        (componentOptions?.propsData as { flickFrom: string })?.flickFrom
      );
    });
    return containers.map(({ __vue__ }) => __vue__) as Array<this>;
  }

  private elFlickMoveListener(e: Event) {
    if (this.isFlickMove) {
      const { x, y } = getXY(e);
      const moveX = x - this.flickStartX;
      const moveY = y - this.flickStartY;
      if (this.isFlicked) {
        this.moveX = moveX;
        this.moveY = moveY;
      } else {
        this.getFlickContainers().forEach((node) => {
          node.moveX = moveX;
          node.moveY = moveY;
        });
      }
    }
  }

  private elFlickEndListener(e: Event) {
    this.setIsFlickMove(false);
    const { innerHeight, innerWidth } = window;
    const { x, y } = getXY(e);
    let moveX = x - this.flickStartX;
    let moveY = y - this.flickStartY;
    const toRight = moveX > 0;
    const toUp = moveY < 0;
    moveX = Math.abs(moveX);
    moveY = Math.abs(moveY);

    const isSnap = new Date().getTime() - this.flickStartTime < 150;
    let upOrDown: UpOrDown | false = false;
    let leftOrRight: LeftOrRight = false;

    if (isSnap) {
      // console.log(moveX);
      if (innerWidth / 8 < moveX || 52 < moveX) {
        leftOrRight = toRight ? 'right' : 'left';
      }
      if (innerHeight / 8 < moveY || 52 < moveY) {
        upOrDown = toUp ? 'up' : 'down';
      }
    } else {
      if (innerWidth / 3 < moveX) {
        leftOrRight = toRight ? 'right' : 'left';
      }
      if (innerHeight / 3 < moveY) {
        upOrDown = toUp ? 'up' : 'down';
      }
    }

    if (this.isFlicked) {
      this.setFlickDataByEnd(leftOrRight, upOrDown, this);
    } else {
      this.getFlickContainers().forEach((node) => {
        this.setFlickDataByEnd(leftOrRight, upOrDown, node);
      });
    }
  }

  private setFlickDataByEnd(leftOrRight: LeftOrRight, upOrDown: UpOrDown, node: this) {
    switch (node.flickFrom) {
      case 'left':
        if (leftOrRight === 'right') {
          node.isFlicked = true;
        } else if (leftOrRight === 'left') {
          node.isFlicked = false;
        }
    }
    node.moveX = 0;
    node.moveY = 0;
  }
}
</script>

<style scoped lang="scss">
.slot-wrapper {
  margin: 0 auto;
  width: 100%;
}

.kw-container {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  background-color: #fff;
  user-select: none;
  transition: transform 0.2s;

  &.flick-move {
    transition: none;
  }

  &.flick-from-top {
    transform: translate(0, -100%);
  }
  &.flick-from-right {
    transform: translate(100%, 0);
  }
  &.flick-from-bottom {
    transform: translate(0, 100%);
  }
  &.flick-from-left {
    transform: translate(-100%, 0);
  }
}

.header {
  position: relative;
  z-index: 1;

  &.shadow {
    box-shadow: 0 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.06);
  }
}

.body {
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;

  @include for-ios {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &.has-footer {
    padding-bottom: 0;
  }
}

.footer {
  box-sizing: border-box;
  position: relative;
  z-index: 1;

  &.shadow {
    box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.08);
  }

  @include for-ios {
    padding-bottom: calc(contant(safe-area-inset-bottom) - 2rem);
    padding-bottom: calc(env(safe-area-inset-bottom) - 2rem);
  }
}
</style>
