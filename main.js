const { app, BrowserWindow, ipcMain } = require('electron');
const electronReload = require('electron-reload');
const path = require('path');
const _ = require('./listeners');
electronReload(__dirname);

const isDev = process.env.NODE_END !== 'production';

const createWindow = () => {
  const win = new BrowserWindow({
    title: 'Costy',
    width: isDev ? 1000 : 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.resolve('./src/core/preload.js'),
    },
  });

  //   Open DevTools
  if (isDev) win.webContents.openDevTools();
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});