import helpers from '@/utilities/helpers.js';

export const state = {
  settingsFile: global.nw.require('path').join(global.nw.App.dataPath, 'settings.json'),
  customScrollbars: false,
  theme: ''
};

export const getters = {};

export const mutations = {
  setCustomScrollbars: function (state, bool) {
    state.customScrollbars = bool;
    helpers.setHtmlTagClasses(state.theme, bool);
  },
  setTheme: function (state, theme) {
    theme = theme || 'dark-mode';
    state.theme = theme;
    helpers.setHtmlTagClasses(theme, state.customScrollbars);
  }
};

export const actions = {
  deleteSettings: function (store) {
    const fs = nw.require('fs');

    try {
      if (fs.existsSync(store.state.settingsFile)) {
        fs.unlinkSync(store.state.settingsFile);
        // eslint-disable-next-line no-console
        console.log('Successfully deleted settings');
      } else {
        // eslint-disable-next-line no-console
        console.log('Settings file did not exist');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error deleting settings file', err);
    }
  },
  loadSettings: function (store) {
    const fs = nw.require('fs');

    store.commit('setAppLoading', true, { root: true });
    let settings = {};

    if (fs.existsSync(store.state.settingsFile)) {
      fs.readFile(store.state.settingsFile, function (err, data) {
        if (err) {
          store.commit('setAppError', 'Unable to load settings.\n' + err, { root: true });
        }

        if (data) {
          try {
            settings = JSON.parse(data);
          } catch (error) {
            store.commit('setAppError', 'Error attempting to load settings.\n' + error, { root: true });
          }
        }

        store.dispatch('applySettings', settings);
      });
    } else {
      store.dispatch('applySettings', settings);
    }
  },
  applySettings: function (store, settings) {
    settings = settings || {};
    store.commit('setCustomScrollbars', settings.customScrollbars);
    store.commit('reposList/setReposList', settings.reposList, { root: true });
    store.commit('setTheme', settings.theme);
    store.commit('setAppLoading', false, { root: true });
  },
  saveSettings: function (store) {
    // Grab Settings
    let settings = {
      customScrollbars: store.state.customScrollbars,
      reposList: store.rootState.reposList.reposList,
      theme: store.state.theme
    };
    settings = JSON.stringify(settings, null, 2);
    global.nw.require('fs').writeFile(store.state.settingsFile, settings, function (err) {
      if (err) {
        store.commit('setAppError', 'There was an error saving your settings. ' + err);
      }
    });
  },
  setCustomScrollbarsAndSave: function (store, bool) {
    store.commit('setCustomScrollbars', bool);
    store.dispatch('saveSettings');
  },
  setThemeAndSave: function (store, theme) {
    store.commit('setTheme', theme);
    store.dispatch('saveSettings');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
