import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sourceImagePaths: [],
    isCompressingImages: false,
    compressionProgressMessage: null,
    toast: null,
    settings: {
      progressive: false,
      stripmarkers: false,
      quality: 40,
      zipOnDownload: false,
      openDirectoryOnDownloaded: true
    },
  },
  mutations: {
    updatePreference(state, payload) {
      // TODO: create async function to save to local db storage so that settings are saved for subsequent app launches
      // emit ipc signal to init save in main process and the emit signal from main to renderer when process completed, here we handle display messages coming from main process
      state.settings.progressive = payload.progressive
      state.settings.stripmarkers = payload.stripmarkers
      state.settings.quality = parseInt(payload.quality)
      state.settings.zipOnDownload = payload.zipOnDownload
      state.settings.openDirectoryOnDownloaded = payload.openDirectoryOnDownloaded
    },
    setAllSelected(state, payload) {
      state.sourceImagePaths.forEach((path, i) => {
        state.sourceImagePaths[i] = {
          ...state.sourceImagePaths[i],
          selected: payload.isAllSelected,
        }
      })
    },
    removeUnselectedImages(state) {
      state.sourceImagePaths = state.sourceImagePaths.filter(path => path.selected)
    },
    unselectImage(state, path) {
      let idx = state.sourceImagePaths.findIndex(elem => elem.filePath === path)
      if (idx === -1) return
      state.sourceImagePaths[idx] = { ...state.sourceImagePaths[idx], selected: false }
    },
    setToast(state, toast) {
      state.toast = toast
    },
    setIsCompressingImages(state, isCompressing) {
      state.isCompressingImages = isCompressing
    },
    setSourceImagePaths(state, paths) {
      state.sourceImagePaths = paths
    },
    addToSourceImagePaths(state, paths) {
      state.sourceImagePaths.push(...paths)
    },
    removeImage(state, path) {
      let idx = state.sourceImagePaths.findIndex(elem => elem.filePath === path)
      if (idx === -1) return
      state.sourceImagePaths.splice(idx, 1)
    },
    clearSourceImagePaths(state) {
      state.sourceImagePaths = []
    },
    sortType(state, payload) {
      console.log("sort payload: ", payload)
      switch (payload.sort) {
        case "FILE_SIZE":
          state.sourceImagePaths.sort((a, b) => {
            const res = a.fileSize > b.fileSize ? 1 : -1
            return payload.order === "DESC" ? res * -1 : res
          })
          break
        case "FILE_NAME":
          state.sourceImagePaths.sort((a, b) => {
            const res = a.fileName > b.fileName ? 1 : -1
            return payload.order === "DESC" ? res * -1 : res
          })
          break
        case "FILE_EXTENSION":
          state.sourceImagePaths.sort((a, b) => {
            const res = a.fileExtension > b.fileExtension ? 1 : -1
            return payload.order === "DESC" ? res * -1 : res
          })
          break
      }
    },
    addCompressedImagesToState(state, payload) {
      console.log(payload)
      if(payload.length){
        state.sourceImagePaths = [...payload]
      }
    },
    setCompressionProgressMessage(state, payload) {
      state.compressionProgressMessage = payload
    },
  },
  actions: {
    compressImages(context) {
      window.ipcRenderer.send("compress-images", {
        sourceImagePaths: context.state.sourceImagePaths,
        settings: context.state.settings,
      })

      window.ipcRenderer.on("compression-progress-message", (event, args) => {
        console.log('msg: ', args)
        context.commit("setCompressionProgressMessage", args)
      })

      // add some sort of signal to ui that image compression is currently being done
      window.ipcRenderer.once("updated-image-file-paths", (event, arg) => {
        // remove that waiting info
        context.commit("addCompressedImagesToState", arg)
        context.commit("setIsCompressingImages", false)
        context.state.toast.success({ title: "success", message: "All images compressed" })
      })
    },
  },
  modules: {},
})
