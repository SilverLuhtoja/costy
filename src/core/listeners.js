const { ipcMain } = require('electron');
const { storage } = require('../storage');

ipcMain.on('saveCategory', (event, categoryValue) => {
  storage.set(categoryValue, []);
});

ipcMain.on('saveCategoryFilter', (event, keyAndValue) => {
  let [key, value] = keyAndValue;
  old_list = storage.get(key);
  storage.set(key, [...old_list, value]);
});
