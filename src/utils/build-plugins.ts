/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
/**
 * Load a group of plugins.
 * @param {object} Vue
 * @param {object} Plugin definitions
 */
export const registerPlugins = (vue: typeof Vue, plugins: any = {}, option: Record<string, unknown>) => {
  for (const plugin in plugins) {
    if (plugin && plugins[plugin]) {
      vue.use(plugins[plugin], option);
    }
  }
};
/**
 * Load a component.
 * @param {object} Vue
 * @param {string} Component name
 * @param {object} Component definition
 */
export const registerComponent = (vue: typeof Vue, name: string, def: any) => {
  if (Vue && name && def) {
    vue.component(name, def);
  }
};
/**
 * Load a group of components.
 * @param {object} Vue
 * @param {object} Object of component definitions
 */
export const registerComponents = (vue: typeof Vue, components: any = {}) => {
  for (const component in components) {
    registerComponent(vue, component, components[component]);
  }
};
/**
 * Load a directive.
 * @param {object} Vue
 * @param {string} Directive name
 * @param {object} Directive definition
 */
export const registerDirective = (vue: typeof Vue, name: any, def: any) => {
  if (vue && name && def) {
    // Ensure that any leading V is removed from the
    // name, as Vue adds it automatically
    vue.directive(name.replace(/^VB/, 'B'), def);
  }
};
/**
 * Load a group of directives.
 * @param {object} Vue
 * @param {object} Object of directive definitions
 */
export const registerDirectives = (vue: typeof Vue, directives: any = {}) => {
  for (const directive in directives) {
    registerDirective(vue, directive, directives[directive]);
  }
};
/**
 * Plugin install factory function.
 * @param {object} { components, directives }
 * @returns {function} plugin install function
 */
export const installFactory = ({ components, directives, plugins }: any = {}) => {
  const install = (vue: typeof Vue, option: Record<string, unknown>) => {
    if (install.installed) {
      /* istanbul ignore next */
      return;
    }
    install.installed = true;
    registerComponents(vue, components);
    registerDirectives(vue, directives);
    registerPlugins(vue, plugins, option);
  };
  install.installed = false;
  return install;
};
/**
 * Plugin object factory function.
 * @param {object} { components, directives, plugins }
 * @returns {object} plugin install object
 */
export const pluginFactory = (options: Record<string, unknown> = {}, extend: any = {}) => ({
  ...extend,
  install: installFactory(options),
});
