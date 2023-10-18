const { app, BrowserWindow, webContents } = require('electron');
const path = require('path');
const _ = require('./src/core/listeners');

// FOR FAST STYLING
// const electronReload = require('electron-reload');
// electronReload(__dirname);

const isDev = process.env.NODE_END !== 'production';

const createWindow = () => {
  const win = new BrowserWindow({
    title: 'Costy',
    width: isDev ? 2000 : 1000,
    height: 1200,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
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
