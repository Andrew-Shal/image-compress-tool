const config = require('../../config')
const {BrowserWindow, ipcMain} = require('electron')
const {main} = require('./main')
const path = require('path')

const helper = require('../helper')

function init() {
    if(preference.window) {
        console.log('preference window aready created')
        return preference.window.show()
    }
    console.log('creating preference window')
    createWindow()
}

function createWindow(){
     preference.window = new BrowserWindow({
        backgroundColor:'#f5f5f5',
        center:true,
        fullscreen:false,
        height:400,
        width:600,
        minHeight: 400,
        minWidth: 600,
        maximizable:false,
        minimizable:false,
        resizable:false,
        show:false,
        modal: true,
        skipTaskbar:false,
        parent:main.window,
        title: `Preferences`,
        autoHideMenuBar:true,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true,
            preload: path.join(__dirname, "preload.js"),
        },
    })

    preference.window.loadURL(helper.getViewURL('/preference','Preference'))
    
    preference.window.once('ready-to-show',function(){
        preference.window.webContents.openDevTools({mode:"detach"})
        preference.window.show()
    })
    
    preference.window.on('close',function(e){
        preference.window.hide()
        e.preventDefault();
    })
}

const preference = {
    init,
    window:null,
}
export {preference}
