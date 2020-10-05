export {
    openExternalLink,
    openPath,
    showItemInFolder,
    moveItemToTrash,
}
const {shell} = require('electron')

function openExternalLink(url){
    shell.openExternal(url)
}
function openPath(path){
    shell.openPath(path)
}
function showItemInFolder(path){
    shell.showItemInFolder(path)
}
function moveItemToTrash(path){
    shell.moveItemToTrash(path)
}