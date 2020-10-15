// TODO : add esc key listener on press to close child window if close diaglog btn or cancel btn is not visible(parent window os off the the side and the child window opens offscreen)

const {BrowserWindow, ipcMain} = require('electron')
const {main} = require('./main')
const path = require('path')

const helper = require('../helper')

function init() {
    if(preference.window) {
        console.log('preference window aready created')
        return show()
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

    // center window
    centerWindow()

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

function show(){
    console.log("show func triggered")
    centerWindow()
    preference.window.show()
}

function centerWindow(){
    // get position of main window and reposition preference window 
    let centerOffset = helper.getCenterOffset(main.getPosition(),main.getSize(), preference.window.getSize())
    console.log("centerOffset: ", centerOffset)
    preference.window.setPosition(centerOffset.x,centerOffset.y)
}

const preference = {
    init,
    show,
    window:null,
}
export {preference}
