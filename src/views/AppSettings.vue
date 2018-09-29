<template>
  <div class="commitlog">
    App Settings
    <button @click="openDevTools">
      Open Dev tools
    </button>
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
      <strong>Pick Theme</strong>:
      <select v-model="pickedTheme" @change="setTheme">
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
      newRepoPath: 'C:\\Users\\Lenny\\Documents\\GitHub\\scout-app',
      pickedTheme: ''
    };
  },
  methods: {
    openDevTools: function () {
      window.nw.Window.get().showDevTools();
    },
    getBranches: function () {
      this.$store.dispatch('getBranchList');
    },
    setNewRepoPath: function () {
      this.$store.commit('setRepoPath', this.newRepoPath.trim());
      this.getBranches();
    },
    setTheme: function () {
      this.$store.dispatch('setThemeAndSave', this.pickedTheme);
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
    ...mapState([
      'appLoading',
      'appError',
      'branches',
      'repoPath',
      'theme',
      'themes'
    ])
  },
  watch: {
    theme: function (val) {
      this.pickedTheme = val;
    }
  }
};
</script>