const { contextBridge, ipcRenderer } = require('electron');
const { FILE_PATH } = require('./src/constants');
const { getOptionsData } = require('./src/scripts/file_scripts.js');

contextBridge.exposeInMainWorld('api', {
  title: 'api title',
  filePath: FILE_PATH,
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
  optionsData: async () => {
    return await getOptionsData();
  }
});
