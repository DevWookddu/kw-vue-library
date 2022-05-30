import { pluginFactory } from '@/utils/build-plugins';

import DayjsPlugin from './dayjs/DayjsPlugin';

const Plugins = pluginFactory({
  plugins: {
    DayjsPlugin,
  },
});

export { Plugins };
