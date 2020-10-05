<template>
  <v-container>
    <v-row>
      <h4>Compression Setting</h4>
    </v-row>
    <v-row>
      <v-col cols="6" class="ma-0 pa-0">
        <v-switch v-model="progressive" class="ma-0" label="Progressive"></v-switch>
      </v-col>
      <v-col cols="6" class="ma-0 pa-0">
        <v-switch v-model="stripmarkers" class="ma-0" label="Strip All Markers"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-0 pa-0" cols="6">
        <v-slider v-model="quality" label="Quality"></v-slider>
      </v-col>
      <v-col class="ma-0 pa-0" cols="2">{{ this.quality }}</v-col>
    </v-row>
    <v-row><h4>Download Settings</h4></v-row>
    <v-row>
      <v-col cols="6" class="ma-0 pa-0">
        <v-switch v-model="zipOnDownload" class="ma-0 pa-0" label="Zip on Download"></v-switch>
      </v-col>
      <v-col cols="6" class="ma-0 pa-0">
        <v-switch v-model="openDirectoryOnDownloaded" class="ma-0 pa-0" label="Open Folder on Download"></v-switch>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn class="mr-4" @click="onSaveBtnClicked">Save</v-btn>
      <v-btn class="mr-4" @click="onCancelBtnClicked">Cancel</v-btn>
    </v-row>
  </v-container>
</template>
<script>
  import {
    bus
  } from "@/main"


  export default {
    name: "PreferenceContainer",
    created() {
      this.init()
    },
    data: () => ({
      progressive: false,
      stripmarkers: false,
      quality: 40,
      zipOnDownload: false,
      openDirectoryOnDownloaded: true
    }),
    methods: {
      init() {
        // get defaults or saved settings from store
        this.progressive = this.$store.state.settings.progressive
        this.stripmarkers = this.$store.state.settings.stripmarkers
        this.quality = this.$store.state.settings.quality
        this.zipOnDownload = this.$store.state.settings.zipOnDownload
        this.openDirectoryOnDownloaded = this.$store.state.settings.openDirectoryOnDownloaded
      },
      onCancelBtnClicked() {
        console.log("cancel btn clicked")
        bus.$emit("bus-preference-cancel-triggered")
      },
      onSaveBtnClicked() {
        console.log("save btn clicked")
        const payload = {
          progressive: this.progressive,
          stripmarkers: this.stripmarkers,
          quality: this.quality,
          zipOnDownload: this.zipOnDownload,
          openDirectoryOnDownloaded: this.openDirectoryOnDownloaded
        }

        bus.$emit("bus-preference-save-triggered", payload)
      },
    },
  }
</script>