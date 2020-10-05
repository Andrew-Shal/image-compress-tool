const {app, protocol, BrowserWindow} = require('electron')
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer"
const isDevelopment = process.env.NODE_ENV !== "production"
const config = require('../../config')
const menu = require('../menu')
const path = require('path')

let window;

function init(){
    if(main.window) return main.window.show()

    protocol.registerSchemesAsPrivileged([
        { scheme: "app", privileges: { secure: true, standard: true } },
    ])

    app.whenReady().then(()=>{
      protocol.registerFileProtocol('file',(request,callback)=>{
        const pathname = decodeURI(request.url.replace('file:///',''));
        callback(pathname)
      })
    })

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit()
    }
  })
  
  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (main.window === null) {
      createWindow()
    }
  })
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        await installExtension(VUEJS_DEVTOOLS)
      } catch (e) {
        console.error("Vue Devtools failed to install:", e.toString())
      }
    }
    createWindow()
  })
}

function createWindow() {
    // Create the browser window.
    main.window = new BrowserWindow({
      width: config.WINDOW_INITIAL_BOUNDS.width,
      height: config.WINDOW_INITIAL_BOUNDS.height,
      minHeight: config.WINDOW_MIN_HEIGHT,
      minWidth: config.WINDOW_MIN_WIDTH,
      title: config.APP_WINDOW_TITLE,
      webPreferences: {
        webSecurity: false,
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: false, // process.env.ELECTRON_NODE_INTEGRATION,
        preload: path.join(__dirname, "preload.js"),
      },
    })
  
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      main.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      // if (!process.env.IS_TEST) window.webContents.openDevTools()
    } else {
      createProtocol("app")
      // Load the index.html when not in development
      main.window.loadURL("app://./index.html")
    }
  
    main.window.on("closed", () => {
      main.window = null
    })

  }

    // Exit cleanly on request from parent process in development mode.
    if (isDevelopment) {
      if (process.platform === "win32") {
        process.on("message", data => {
          if (data === "graceful-exit") {
            app.quit()
          }
        })
      } else {
        process.on("SIGTERM", () => {
          app.quit()
        })
      }
    }
  
  
    // exports functions
    function hide () {
        if(!main.window) return
        main.window.hide()
    }

    function show(){
      if(!main.window) return
      main.window.show()
    }
    
    function setTitle(title){
        if(!main.window) return 
        main.window.setTitle(title)
    }

    function toggleAlwaysOnTop(flag){
      if(!main.window) return
      if(flag == null){
          flag = !main.window.isAlwaysOnTop()
      }
      main.window.setAlwaysOnTop(flag)
      menu.onToggleAlwaysOnTop(flag)
    }
    function toggleDevTools(){
        if(!main.window) return
        if(main.window.webContents.isDevToolsOpened()){
            main.window.webContents.closeDevTools()
        }else{
            main.window.webContents.openDevTools({mode:'detach'})
        }
    }
  
    function dispatch(...args){
        send('dispatch',...args)
    }
  
    function send(...args){
        if(!main.window) return
        main.window.send(...args)
    }

    const main = {
      dispatch,
      send,
      hide,
      init,
      setTitle,
      show,
      toggleAlwaysOnTop,
      toggleDevTools,
      window
    }

    export {main}