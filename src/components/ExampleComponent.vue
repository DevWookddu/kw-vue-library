<template>
  <button class="example-component bg-red-100 px-4 py-3 hover:bg-red-300">
    <div>Tailwind Button</div>
    <slot />
  </button>
</template>

<script lang="ts">
import { IdeComponent } from '../decorators/IdeComponent';
import { IdeProp } from '../decorators/IdeProp';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'ExampleComponent',
})
@IdeComponent({ description: 'IdeComponent Description' })
export default class ExampleComponent extends Vue {
  @Prop()
  @IdeProp({ type: 'string' })
  private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
