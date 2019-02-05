// Modules to control application life and create native browser window
const {app, BrowserWindow, menu} = require('electron')
const path = require('path');
const Store = require('./assets/js/store.js');
// const path = require('path');
// const Store = require('./assets/js/store.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 280, height: 280, resizable: false, frame: false})

  // mainWindow = new BrowserWindow({width: 1000, height: 780, resizable: true, frame: true})
  // mainWindow.webContents.openDevTools()

  // width 280

  store.set();


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  console.log('loaded');
  

  // Open the DevTools.


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    // 800x600 is the default size of our window
    hideTimeDateText: { field: false },
    spiralTime: { field: 'day' },
    palette: { field: '' },
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



