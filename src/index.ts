import './assets/css/normalize.css';
import './assets/css/tailwind.css';
import { installFactory } from './utils/build-plugins';
import * as Components from './components/index';
import { Plugins } from './plugins/index';
import './assets/scss/main.scss';

const NAME = 'KwVueLibrary';

const install = installFactory({
  plugins: {
    Components: Components.Components,
    Plugins,
  },
});

const KwVueLibrary = {
  NAME,
  install,
};

export default {
  ...KwVueLibrary,
  ...Components,
};
