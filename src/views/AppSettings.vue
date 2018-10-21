<template>
  <div class="app-settings">
    <button @click="getBranches">
      Get Branches
    </button>
    <input
      v-model="newRepoPath"
      type="text"
      style="width: 100%"
      @keyup.enter="setNewRepoPath"
    />
    <div>
      <strong>App Loading</strong>: <pre>{{ appLoading }}</pre>
    </div>
    <div>
      <strong>App Error</strong>: <pre>{{ appError }}</pre>
    </div>
    <div>
      <strong>Repo Path</strong>: <pre>{{ repoPath }}</pre>
    </div>
    <div>
      <strong>Branches</strong>: <pre>{{ branches }}</pre>
    </div>
    <div>
      <label>
        <input v-model="useCustomScrollbars" type="checkbox" @change="setCustomScrollbars" />
        <strong>Use styled scrollbars</strong>
      </label>
      <div v-if="scrollbarSettingChanged">
        Setting saved, <a href="#" @click="reloadApp">reload app</a> for setting to take effect.
      </div>
    </div>
    <div>
      <strong>Pick Theme</strong>:
      <select v-model="pickedTheme" @change="setTheme" ref="testPickTheme">
        <option v-for="(theme, themeIndex) in themesList" :key="'theme' + themeIndex" :value="theme.file">
          {{ theme.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AppSettings',
  data: function () {
    return {
      newRepoPath: global.nw.App.startPath,
      pickedTheme: '',
      scrollbarSettingChanged: false,
      useCustomScrollbars: false
    };
  },
  methods: {
    getBranches: function () {
      this.$store.dispatch('getBranchList');
    },
    reloadApp: function () {
      global.nw.Window.get().reload();
    },
    setNewRepoPath: function () {
      this.$store.commit('setRepoPath', this.newRepoPath.trim());
      this.getBranches();
    },
    setCustomScrollbars: function () {
      this.scrollbarSettingChanged = true;
      this.$store.dispatch('appSettings/setCustomScrollbarsAndSave', this.useCustomScrollbars);
    },
    setTheme: function () {
      this.$store.dispatch('appSettings/setThemeAndSave', this.pickedTheme);
    }
  },
  computed: {
    themesList: function () {
      let list = [];
      this.themes.forEach(function (file) {
        let title = file.split('-');
        title = title.map(function (word) {
          // Uppercase first letter
          return word = word[0].toUpperCase() + word.slice(1, word.length);
        });
        list.push({
          title: title.join(' '),
          file: file
        });
      });
      return list;
    },
    ...mapState('appSettings', [
      'customScrollbars',
      'theme'
    ]),
    ...mapState([
      'appLoading',
      'appError',
      'branches',
      'repoPath',
      'themes'
    ])
  },
  watch: {
    theme: function (val) {
      this.pickedTheme = val;
    }
  },
  created: function () {
    this.pickedTheme = this.theme;
    this.useCustomScrollbars = this.customScrollbars;
    console.log(this.themes);
  }
};
</script>
