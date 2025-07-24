const { app, BrowserWindow } = require('electron');
const path = require('path');

// Function to create a browser window
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: true,
    maximizable:true,
    icon: path.join(__dirname, 'icon.ico'), // Optional icon
    webPreferences: {
    nodeIntegeration:false,
      contextIsolation: true, // safer, disables nodeIntegration inside HTML
    preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('main.html'); // Load your main HTML file
}

// Run the function when Electron is ready
app.whenReady().then(createWindow);

// Quit the app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit(); // Exit app for Windows/Linux
  }
});
