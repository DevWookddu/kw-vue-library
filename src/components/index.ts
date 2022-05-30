import { pluginFactory } from '@/utils/build-plugins';

import ExampleComponent from './ExampleComponent.vue';

const Components = pluginFactory({
  components: {
    ExampleComponent,
  },
});

export { Components };
