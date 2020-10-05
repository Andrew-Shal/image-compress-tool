<template>
  <v-container class="home d-flex">
    <ImagelistContainer />
    <FloatActionButtons :hasBeenCompressed="hasBeenCompressed" :hasImages="hasImages" />
  </v-container>
</template>

<script>
  // @ is an alias to /src
  import ImagelistContainer from "@/components/ImageListContainer.vue"
  import FloatActionButtons from "@/components/FloatActionButtons.vue"

  import {
    bus
  } from "@/main"

  export default {
    name: "Home",
    components: {
      ImagelistContainer,
      FloatActionButtons,
    },
    computed: {
      hasBeenCompressed: function () {
        if (this.hasImages) {
          console.log(
            "has been compressed: ",
            this.$store.state.sourceImagePaths[0].compressed ? true : false
          )
          return this.$store.state.sourceImagePaths[0].compressed ? true : false
        }
        return false
      },
      hasImages: function () {
        return this.$store.state.sourceImagePaths.length ? true : false
      },
    },
    created() {
      window.ipcRenderer.on("main-to-bus-add-images",(e,arg) => {
        bus.$emit("bus-add-images")
      })

      bus.$on("bus-compress-images", () => {
        this.$store.dispatch("compressImages")
        this.$store.commit("setIsCompressingImages", {
          isCompressing: true,
          toast: this.$toast,
        })
      })

      bus.$on("bus-clear-images", () => {
        this.$store.commit("clearSourceImagePaths")
        this.$toast.success({
          title: "success",
          message: "All images removed!"
        })
      })

      bus.$on("bus-add-images", () => {
        let imgPaths = window.ipcRenderer.sendSync("open-image-select-dialog", "")

        if (!this.$store.state.sourceImagePaths.length) {
          // set new
          this.$store.commit("setSourceImagePaths", imgPaths)
        } else {
          this.$store.commit("addToSourceImagePaths", imgPaths)
          this.$toast.success({
            title: "Image List addition",
            message: `${imgPaths.length} new images added`,
          })
        }
      })

      bus.$on("bus-download-images", () => {
        // extract source folder
        const sampleFilePath = this.$store.state.sourceImagePaths[0].compressed.filePath
        window.ipcRenderer.send("download-compressed-images", {
          sampleFilePath: sampleFilePath,
          settings: this.$store.state.settings,
        })

        window.ipcRenderer.once("compressed-images-downloaded", (event, args) => {
          // clear the selected images state
          this.$store.commit("clearSourceImagePaths")
          this.$toast.success({
            message: args.message,
            title: args.title
          })
          this.$store.commit("setCompressionProgressMessage", null)
        })
      })
    },
    data: () => ({}),
  }
</script>

<style>

.home{
  flex-wrap:wrap;
}
.home .flex-item{
  width:100%;  
}
</style>