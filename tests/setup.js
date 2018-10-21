global.nw = {
  App: {
    manifest: {
      dependencies: {
        vue: '~0.0.0'
      },
      version: '0.0.0'
    },
    startPath: 'C:\\folder'
  },
  process: {
    versions: {
      chromium: '0.0.0',
      node: '0.0.0',
      nw: '0.0.0'
    }
  },
  require: jest.fn(),
  Shell: {
    openExternal: jest.fn()
  }
};

