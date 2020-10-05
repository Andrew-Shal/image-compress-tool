export {
    openImageSelection,
    openSaveDirectory,
    errorMessageBox,
}

const {dialog} = require('electron')
const windows = require('./windows')

function openImageSelection(){
    const opts = {
        title:"Select Image(s)",
        properties: ["multiSelections", "openFile"],
        filters: [{name: "Images", extensions: ["jpg","png"]}],
    }
    return dialog.showOpenDialogSync(windows.main.win, opts)
}

function openSaveDirectory(){
    const opts = {
        title: "Choose output directory",
        properties: ["openDirectory"]
    }
    return dialog.showOpenDialogSync(windows.main.win, opts)
}

function errorMessageBox(msg){
    return dialog.showMessageBoxSync(window.win, {type:"error",title:"Error Caught", buttons:["Close"]})
}