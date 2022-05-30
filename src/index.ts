import './assets/css/normalize.css';
import { installFactory } from './utils/build-plugins';
import { Components } from './components/index';
import { Plugins } from './plugins/index';

const NAME = 'KwVueLibrary';

const install = installFactory({
  plugins: {
    Components,
    Plugins,
  },
});

const KwVueLibrary = {
  NAME,
  install,
};

export default {
  ...KwVueLibrary,
};
