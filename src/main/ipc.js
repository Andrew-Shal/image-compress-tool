export {
    init,
}

const {app, ipcMain, shell} = require('electron')
const helper = require('./helper')
const compressor = require('./compressor')
const { realpathSync } = require("fs")
const { basename, dirname, join } = require("path")
const {logger} = require('./logger')

const {preference,main} = require("./windows")

function init(){
  ipcMain.on("open-image-select-dialog", e => {
    const dialog = require('./dialog')
    const filePaths = dialog.openImageSelection()
    e.returnValue = helper.getImagesInfo(filePaths)
  })

  ipcMain.on("compress-images", async (event, args) => {
    // might have to pass args as an obj in the future we may pass other settings in args
    let filePaths = [...args.sourceImagePaths] // arr of image data objs
    let settings = args.settings
    if (!helper.isValidCompressionQuality(args.settings.quality)) throw new Error("compression quality is out of bounds!")

    const folderId = helper.getUniqueUID()
    
    logger.info(`Batch compression initiated - ${folderId}`)
    logger.info(`compression settings: ${JSON.stringify(settings)}`)

    const updatedFilePaths = await Promise.all(
      filePaths.map(async (file, i) => {
        event.reply(
          "compression-progress-message",
          `compressing ${file.fileName} - ${helper.getMbSize(file.fileSize)}`
        )
        const compressedFile = await compressor.compress(file.filePath,join(app.getPath("documents"),"compressed",folderId),settings)
        if(compressedFile != undefined){
          filePaths[i] = {
            ...filePaths[i],
            compressed: helper.getImageInfo(compressedFile.destinationPath),
          }
        
          logger.info(`compressed ${file.fileName} - ${helper.getMbSize(file.fileSize)} => ${helper.getMbSize(filePaths[i].compressed.fileSize)}`)
          event.reply(
            "compression-progress-message",
            `${filePaths[i].compressed.fileName} - ${helper.getMbSize(file.fileSize)} => ${helper.getMbSize(filePaths[i].compressed.fileSize)} compressed`
          )
          return filePaths[i]
        }else{
          // TODO: fallback to default settings that should work on image
          throw Error("file not compressed")
        }
      })
    ).catch(err => {
      logger.log("error",`error catched in main promise all: ${err}`)
      // TODO: handle errors, probably throw an event to ui so that ui doesnt stuck on loading
    })
    logger.info(`Batch compression completed - ${folderId}`)
    event.reply("updated-image-file-paths", updatedFilePaths)
  })

  ipcMain.on("download-compressed-images", (event, args) => {
    const dialog = require('./dialog')
    let outPath = dialog.openSaveDirectory()
    let settings = args.settings

    if (!outPath) return

    const sourceDirectory = dirname(realpathSync(args.sampleFilePath))
    const parentDirectory = basename(sourceDirectory)
    if (!sourceDirectory) return

    if (settings.zipOnDownload) {
      helper.zipFolder(sourceDirectory, `${join(...outPath,parentDirectory)}.zip`)
        .then(err => {
          if (err) throw err

          event.reply("compressed-images-downloaded", {
            title: "download success",
            message: `compressed folder saved at ${join(...outPath,parentDirectory)}.zip`,
          })

          // delete the temp source folder
          helper.removeDir(sourceDirectory, { recursive: true })
          if(settings.openDirectoryOnDownloaded){
            shell.openPath(...outPath)
          }
        })
        .catch(err => {
          console.log("err in zipFolder fn: ", err)
        })
    } else {
      // simply move folder to location
      helper.copy(sourceDirectory, `${outPath}/${parentDirectory}`)
        .then(err => {
          if(err) throw err

          event.reply("compressed-images-downloaded", {
            title: "download success",
            message: `Folder saved at ${outPath}/${parentDirectory}/`,
          })
          helper.removeDir(sourceDirectory, { recursive: true })
          if(settings.openDirectoryOnDownloaded){
            shell.openPath(`${outPath}/${parentDirectory}/`)
          }
        })
        .catch(err => {
          console.log("err in fsExtra copy fn: ", err)
        })
    }
  });

  ipcMain.on("close-preference-window",(e,arg) => {
    // TODO : rework this
    console.log("preference window is closing")
    if(preference.window.isVisible) preference.window.hide()
  })

  ipcMain.on("updated-preference",(e,arg) => {
    console.log("sending update to main ui")
    main.window.send("preferences-updated","test")
  })
}
