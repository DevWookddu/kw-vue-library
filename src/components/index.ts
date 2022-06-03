import { pluginFactory } from '../utils/build-plugins';

import KwApp from './container/KwApp.vue';
import KwContainer from './container/KwContainer.vue';
import KwContainerTransition from './container/KwContainerTransition.vue';

import KwColumn from './grid/KwColumn.vue';
import KwRow from './grid/KwRow.vue';

import KwButton from './KwButton.vue';
import KwDateTimePicker from './KwDateTimePicker.vue';

import KwInputField from './input/KwInputField.vue';
import KwSelect from './input/KwSelect.vue';

const Components = pluginFactory({
  components: {
    KwApp,
    KwContainer,
    KwContainerTransition,

    KwRow,
    KwColumn,

    KwButton,

    KwInputField,
    KwSelect,
    KwDateTimePicker,
  },
});

export { Components };
