'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const qici = require('qici/editorservice/Start.js');
var defaultMenu = require('electron-default-menu');
var Menu = require('menu');
var dialog = require('dialog');




let mainWindow;
function createWindow ()
{
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('http://localhost:5002/Project.html');
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', function() {
  
  // Get template for default menu 
  var menu = defaultMenu()
 
  // Add custom menu 
  menu.splice(4, 0, {
    label: 'Custom',
    submenu: [
      {
        label: 'Do something',
        click: function(item, focusedWindow) {
          dialog.showMessageBox({message: 'Do something', buttons: ['OK'] })
        }
      }
    ]
  })
 
  // Set top-level application menu, using modified template 
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

  createWindow();
});

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
    qici.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (mainWindow === null) {
    createWindow();
  // }
});
