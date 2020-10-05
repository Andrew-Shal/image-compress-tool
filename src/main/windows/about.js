const config = require('../../config')
const { BrowserWindow, ipcMain} = require('electron')
const {main} = require('./main')
const path = require('path')

const helper = require('../helper')

function init() {
    if(about.window) {
        console.log('about win aready created')
        return about.window.show()
    }
    createWindow()
}

function createWindow(){
    about.window = new BrowserWindow({
        backgroundColor:'#f5f5f5',
        center:true,
        fullscreen:false,
        height:400,
        width:650,
        minHeight: 400,
        minWidth: 650,
        maximizable:false,
        minimizable:false,
        resizable:false,
        show:false,
        skipTaskbar:false,
        parent:main.window,
        title:  `About ${config.APP_WINDOW_TITLE}`,
        autoHideMenuBar:true,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true,
            preload: path.join(__dirname, "preload.js"),
        },
    })
    
    about.window.loadURL(helper.getViewURL('/about','About'))
    about.window.once('ready-to-show',function(){
        //about.window.webContents.openDevTools({mode:"detach"})
        about.window.show()
        about.window.webContents.send("send-about-data-view",config.APP_INFO)
    })
    
    about.window.on('close',function(e){
        about.window.hide()
        e.preventDefault();
    })
/*     about.window.on('closed',function(e){
        about.window = null
    }) */
}

const about = {
    init,
    window:null
}
export {about}

