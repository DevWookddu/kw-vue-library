import { pluginFactory } from '../utils/build-plugins';

import KwUi from './KwUi';

import KwApp from './container/KwApp.vue';
import KwContainer from './container/KwContainer.vue';
import KwContainerTransition from './container/KwContainerTransition.vue';

import KwColumn from './grid/KwColumn.vue';
import KwRow from './grid/KwRow.vue';

import KwButtonVue from './KwButton.vue';
export * from './KwButton';

import KwDateTimePickerVue from './KwDateTimePicker.vue';
export * from './KwDateTimePicker';

import KwInputFieldVue from './input/KwInputField.vue';
export * from './input/KwInputField';

import KwSelectVue from './input/KwSelect.vue';
export * from './input/KwSelect';

const Components = pluginFactory({
  components: {
    KwApp,
    KwContainer,
    KwContainerTransition,

    KwRow,
    KwColumn,

    KwButton: KwButtonVue,

    KwInputField: KwInputFieldVue,
    KwSelect: KwSelectVue,
    KwDateTimePicker: KwDateTimePickerVue,
  },
});

export { Components, KwUi };
