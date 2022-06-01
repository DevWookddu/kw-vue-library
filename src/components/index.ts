import { pluginFactory } from '@/utils/build-plugins';

import KwApp from './container/KwApp.vue';
import KwContainer from './container/KwContainer.vue';
import KwContainerTransition from './container/KwContainerTransition.vue';

import KwColumn from './grid/KwColumn.vue';
import KwRow from './grid/KwRow.vue';

import KwButton from './KwButton.vue';

const Components = pluginFactory({
  components: {
    KwApp,
    KwContainer,
    KwContainerTransition,

    KwRow,
    KwColumn,

    KwButton,
  },
});

export { Components };
