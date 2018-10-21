import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import AppSettings from '@/views/AppSettings.vue';
import { actions } from '@/store/modules/AppSettings.js';

describe('AppSettings.vue', () => {
  let store;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Store({
      state: {
        appLoading: false,
        appError: '',
        branches: '',
        repoPath: '',
        themes: ['light-mode', 'dark-mode']
      },
      getters: {},
      mutations: {},
      actions: {},
      modules: {
        appSettings: {
          namespaced: true,
          state: {
            customScrollbars: true,
            theme: ''
          },
          actions
        }
      }
    });
  });

  describe('Created', () => {
    beforeEach(() => {
      global.nw.require = jest.fn(function (x) {
        console.log(x);
      });
    });

    test('Default snapshot', () => {
      const wrapper = shallowMount(AppSettings, {
        store,
        localVue
      });

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });

  describe('Themes', () => {
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
        } else if (moduleName === 'path') {
          return require('path');
        }
        return require(moduleName);
      });
    });

    test('Change theme', () => {
      const wrapper = shallowMount(AppSettings, {
        store,
        localVue
      });

      // wrapper.find({ ref: 'testPickTheme' }).setValue('dark-theme');

      expect(wrapper.vm.$store.state.appSettings.theme)
        .toEqual('asdf');
    });
  });
});
