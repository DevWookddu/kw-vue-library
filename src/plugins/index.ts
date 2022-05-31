import { pluginFactory } from '@/utils/build-plugins';

import DayjsPlugin from './dayjs/DayjsPlugin';
import ToastPlugin from './toast/ToastPlugin';

const Plugins = pluginFactory({
  plugins: {
    DayjsPlugin,
    ToastPlugin,
  },
});

export { Plugins };
