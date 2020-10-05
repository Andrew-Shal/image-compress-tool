// TODO : reorder menu items, also update accelerators
export  {
    init,
    onToggleAlwaysOnTop
}

const {app, Menu} = require('electron')
const config = require('../config')
const windows = require('./windows')

let menu = null

function init(){
    menu = Menu.buildFromTemplate(getMenuTemplate())
    Menu.setApplicationMenu(menu)
}

function onToggleAlwaysOnTop(flag){
    getMenuItem('Float on Top').checked = flag
}

function getMenuTemplate(){
    const template = [
        {
          label:'File',
          accelerator:'Ctrl+F',
          submenu:[
            {
                label:'Select Images',
                accelerator: 'Ctrl+I',
                click: () => {
                  // todo
                  console.log('select images menu item triggered!') 
                  windows.main.window.send("main-to-bus-add-images")
                }
            },
            {
              label:'Preferences',
              accelerator:'Ctrl+P',
              click: () => windows.preference.init()
            },
          ],
        },
        {
            label: 'Developer',
            submenu: [
              {
                label: 'Developer Tools',
                accelerator: process.platform === 'darwin'
                  ? 'Alt+Command+I'
                  : 'Ctrl+Shift+I',
                click: () => windows.main.toggleDevTools()
              },
            ]
          },
          {
            label: 'Help',
            role: 'help',
            submenu: [
              {
                label: 'Learn more about ' + config.APP_NAME,
                click: () => {
                  const shell = require('./shell')
                  shell.openExternalLink(config.HOME_PAGE_URL)
                }
              },
              {
                label: 'Release Notes',
                click: () => {
                  const shell = require('./shell')
                  shell.openExternalLink(config.GITHUB_URL_RELEASES)
                }
              },
              {
                label: 'Contribute on GitHub',
                click: () => {
                  const shell = require('./shell')
                  shell.openExternalLink(config.GITHUB_URL)
                }
              },
              {
                type: 'separator'
              },
              {
                label: 'Report an Issue...',
                click: () => {
                  const shell = require('./shell')
                  shell.openExternalLink(config.GITHUB_URL_ISSUES)
                }
              },
              {
                label: 'Follow us on Twitter',
                click: () => {
                  const shell = require('./shell')
                  shell.openExternalLink(config.TWITTER_PAGE_URL)
                }
              }
            ]
          },
          {
            label: 'About ' + config.APP_INFO.APP_NAME,
            click: () => windows.about.init()
          }
    ]

    return template;
}