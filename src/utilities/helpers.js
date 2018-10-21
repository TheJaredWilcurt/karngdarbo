const helpers = {
  setCurrentWorkingDirectory: function (dir) {
    dir = dir.trim();
    if (global.nw.require('fs').existsSync(dir)) {
      global.nw.process.chdir(global.nw.require('path').join(dir));
    }
  },
  setHtmlTagClasses: function (theme, useCustomScrollbars) {
    let customScrollbars = '';
    if (useCustomScrollbars) {
      customScrollbars = 'custom-scrollbars';
    }

    let classes = [
      theme,
      customScrollbars
    ].join(' ').trim();

    document.documentElement.className = classes;
  },
  validateRepoPath: function (repoPath) {
    let gitDir = global.nw.require('path').join(repoPath, '.git');
    if (
      global.nw.require('fs').existsSync(repoPath) &&
      global.nw.require('fs').lstatSync(repoPath).isDirectory() &&
      global.nw.require('fs').existsSync(gitDir) &&
      global.nw.require('fs').lstatSync(gitDir).isDirectory()
    ) {
      return true;
    }
    return false;
  }
};

export default helpers;
