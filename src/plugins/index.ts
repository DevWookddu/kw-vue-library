import { pluginFactory } from '@/utils/build-plugins';

import DayjsPlugin from './dayjs/DayjsPlugin';
import ToastPlugin from './toast/ToastPlugin';
import DialogPlugin from './dialog/DialogPlugin';

const Plugins = pluginFactory({
  plugins: {
    DayjsPlugin,
    ToastPlugin,
    DialogPlugin,
  },
});

export { Plugins };
