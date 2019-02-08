const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");
const Store = require('./assets/js/store.js');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Get user prefs
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    hideTimeDateText: { field: false },
    spiralTime: { field: 'day' },
    palette: { field: '' },
  }
});

// Init window
let win

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

// Menu
let template = []
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

// Create the browser window.
function createWindow () {
  win = new BrowserWindow({width: 280, height: 280, resizable: false, frame: false})

  // For Debugging
  // win = new BrowserWindow({ width: 1000, height: 780, resizable: true, frame: true, "webPreferences": {"nodeIntegration": true} })
  // win.webContents.openDevTools()

  // Store user prefs
  store.set();

  // and load the index.html of the app.
  win.loadFile('index.html')
  
  // Emitted when the window is closed.
  win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  return win;
}

app.on('ready', function() {

  autoUpdater.checkForUpdatesAndNotify();
  
  // Create the Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  createWindow();
});

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
  if (win === null) {
    createWindow()
  }
})



