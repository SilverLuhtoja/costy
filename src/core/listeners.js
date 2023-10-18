const { ipcMain } = require('electron');
const { storage } = require('../storage');

ipcMain.on('saveCategory', (event, categoryValue) => {
  storage.set(categoryValue, []);
});

ipcMain.on('saveCategoryFilter', (event, keyAndValue) => {
  let [key, value] = keyAndValue;
  let old_list = storage.get(key);
  storage.set(key, [...old_list, value]);
});

ipcMain.on('removeCategory', (event, categoryValue) => {
  storage.remove(categoryValue);
});

ipcMain.on('removeCategoryFilter', (event, object) => {
  const key = Object.keys(object)[0];
  const value = object[key];
  storage.remove(key, value);
});
