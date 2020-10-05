const windows = require('./main/windows')
const menu = require('./main/menu')
const ipc = require('./main/ipc')

windows.main.init()
menu.init()
ipc.init()