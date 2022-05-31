import { pluginFactory } from '@/utils/build-plugins';

import ExampleComponent from './ExampleComponent.vue';
import KwContainer from './container/KwContainer.vue';

const Components = pluginFactory({
  components: {
    ExampleComponent,
    KwContainer,
  },
});

export { Components };
