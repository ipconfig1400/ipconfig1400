const {app, BrowserWindow} = require('electron');

const url = require('url');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    title : "Serial App",
    width : 800,
    height : 600,
    webPreferences : {
      nodeIntegration : true,
      contextIsolation : false, //use node.js in browser
    }
  });

  win.loadURL('http://192.168.1.2:3000');
  //win.loadFile('src/view/index.html');
}

app.whenReady().then(createWindow);