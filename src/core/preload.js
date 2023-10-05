const { contextBridge, ipcRenderer } = require('electron');
const { FILE_PATH } = require('../constants');

contextBridge.exposeInMainWorld('api', {
  title: 'api title',
  filePath: FILE_PATH,
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.send(channel, (event,...args) => func(...args))
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add_category_btn').addEventListener('click', () => {
    add_category_element = document.getElementById('add_category_value');
    ipcRenderer.send('saveCategory', add_category_element.value);
    add_category_element.value = '';
  });
});
