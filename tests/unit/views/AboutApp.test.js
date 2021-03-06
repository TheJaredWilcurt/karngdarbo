import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import AboutApp from '@/views/AboutApp.vue';
import mutations from '@/store/mutations.js';

describe('AboutApp.vue', () => {
  let store;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Store({
      state: {
        appError: ''
      },
      getters: {},
      mutations,
      actions: {}
    });
  });

  describe('Created', () => {
    beforeEach(() => {
      global.nw.require = jest.fn(function (moduleName) {
        if (moduleName === 'child_process') {
          return {
            exec: function (command, callback) {
              if (command === 'git --version') {
                callback(null, 'git version 0.0.0.windows.0 ');
              }
            }
          };
        }
        return require(moduleName);
      });
    });

    test('Default snapshot', () => {
      const wrapper = shallowMount(AboutApp);

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });

  describe('External link', () => {
    beforeEach(() => {
      global.nw.require = require;
    });

    test('Click link', () => {
      const wrapper = shallowMount(AboutApp);

      wrapper.find({ ref: 'testExternalLink' }).trigger('click');

      expect(nw.Shell.openExternal)
        .toHaveBeenCalledWith('http://TheJaredWilcurt.com');
    });
  });


  describe('Error handling', () => {
    beforeEach(() => {
      global.nw.require = jest.fn((moduleName) => {
        if (moduleName === 'child_process') {
          return {
            exec: jest.fn((command, callback) => {
              callback('There was an error.');
            })
          };
        } else {
          return;
        }
      });
    });

    test('git version', () => {
      const wrapper = shallowMount(AboutApp, {
        store,
        localVue
      });

      expect(wrapper.vm.$store.state.appError)
        .toEqual('There was an error.');
    });
  });
});
