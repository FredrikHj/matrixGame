const {app, BrowserWindow} = require('electron')      
function createWindow () {   
    // Create the browser window.     
    win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    });
    
    win.once('ready-to-show', () => {
        win.show()
    })
    win.webContents.openDevTools();
    // and load the index.html of the app.      
    win.loadURL('http://localhost:3000/');
}      
app.on('ready', createWindow)