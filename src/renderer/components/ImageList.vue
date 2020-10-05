<template>
  <v-container class="fill-height" fluid style="min-height: 434px">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row justify="end">
            <v-col cols="2">
              <v-select v-on:change="sortType" :items="sortTypes" label="Sort by" outlined dense></v-select>
            </v-col>
            <v-col cols="2">
              <v-select v-on:change="sortOrder" :items="sortOrders" label="Sort order" outlined dense></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-row justify="start">
            <template v-if="selectMode">
              <v-col cols="3">
                <v-checkbox v-model="isAllSelected" v-on:change="selectAll()"
                  v-bind:label="!isAllSelected ? 'Select All' : 'Unselect All'"></v-checkbox>
              </v-col>
              <v-col cols="6" align-self="center">
                <v-btn v-on:click="removeUnselectedImages()" depressed large color="blue" class="mr-2">Update</v-btn>
                <v-btn v-on:click="exitSelectMode()" depressed large color="blue" class="ml-2">Cancel</v-btn>
              </v-col>
            </template>
          </v-row>
        </v-col>

        <v-col cols="6" align-self="center">
          <v-row justify="end" align="center">
            <v-col cols="4" align-self="center">
              Total file size:
              <b>{{ getMbSize(totalUncompressedFileSize) }}</b>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-container>
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col v-for="(imgData, i) in sourceImagePaths" xl="3" lg="4" md="6" sm="6" :key="i">
          <ImageListItem :inSelectMode="selectMode" :imageData="imgData" @long-pressed="handleLongPressed"
            @chekbox-toggled="handleCheckboxToggled" @remove-item="handleRemoveItem"
            @preview-btn-triggered="handlePreviewBtnClicked" />
        </v-col>
      </v-row>
    </v-fade-transition>
    <v-overlay :value="isCompressingImages" style="text-align:center;">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <v-row justify="center" class="pt-10">{{ compressionProgressMessage }}</v-row>
    </v-overlay>
    <template v-if="previewModalData">
      <ImageComparer :overlay="isPreviewModalOpened" :closeDialog="closePreviewModal"
        :selectedImage="previewModalData" />
    </template>
  </v-container>
</template>

<style>
  .ellipsis {
    white-space: nowrap;
    width: 315px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .clickable {
    cursor: pointer;
  }

  .v-card .v-overlay__content {
    position: relative;
    width: 100%;
    padding: 20px;
  }
</style>
<script>
  import ImageComparer from "@/components/ImageComparer.vue"
  import ImageListItem from "@/components/ImageListItem.vue"
  import utils from "@/utils"

  export default {
    name: "ImageList",
    components: {
      ImageComparer,
      ImageListItem,
    },
    methods: {
      // helpers
      getMbSize: function (val) {
        return utils.getMbSize(val)
      },
      // modal handlers
      openPreviewModal: function (data) {
        this.isPreviewModalOpened = true
        this.previewModalData = data
      },
      closePreviewModal: function () {
        this.isPreviewModalOpened = false
        this.previewModalData = null
        console.log("close triggered!")
      },

      // image item handlers
      handlePreviewBtnClicked: function (_, imgData) {
        this.openPreviewModal(imgData)
      },
      handleLongPressed: function (_) {
        this.selectMode = true
        this.toBeRemoved = []
      },
      handleCheckboxToggled: function (_, val) {
        this.setIsAllSelected(val)
      },
      handleRemoveItem: function (_, path) {
        this.$store.commit("removeImage", path)
      },
      selectAll: function () {
        this.$store.commit("setAllSelected", {
          isAllSelected: this.isAllSelected,
        })
      },
      setIsAllSelected: function (flag) {
        this.isAllSelected = flag
      },
      exitSelectMode: function () {
        this.selectMode = false
        this.isAllSelected = true
        this.$store.commit("setAllSelected", {
          isAllSelected: true
        })
      },
      removeUnselectedImages: function () {
        const originalImgListNum = this.numImages

        this.$store.commit("removeUnselectedImages")
        this.isAllSelected = true
        this.selectMode = false

        const newImgListNum = this.numImages
        if (originalImgListNum != newImgListNum)
          this.$toast.success({
            title: "success",
            message: `${originalImgListNum - newImgListNum} image(s) removed`,
          })
      },
      sortOrder: function (val) {
        console.log("ev1: ", val)
        this.selectedSortOrder = val
        this.$store.commit("sortType", {
          sort: this.selectedSortType,
          order: this.selectedSortOrder,
        })
      },
      sortType: function (val) {
        console.log("ev2: ", val)
        this.selectedSortType = val
        this.$store.commit("sortType", {
          sort: this.selectedSortType,
          order: this.selectedSortOrder,
        })
      },
    },
    computed: {
      compressionProgressMessage() {
        return this.$store.state.compressionProgressMessage
      },
      totalUncompressedFileSize() {
        return this.$store.state.sourceImagePaths.reduce((acc, cv) => {
          return acc + cv.fileSize
        }, 0)
      },
      sourceImagePaths() {
        return this.$store.state.sourceImagePaths
      },
      numImages() {
        return this.$store.state.sourceImagePaths.length
      },
      isCompressingImages() {
        return this.$store.state.isCompressingImages
      },
    },
    data: () => ({
      previewModalData: null,
      isPreviewModalOpened: false,
      selectMode: false,
      isAllSelected: true,
      selectedSortType: "FILE_SIZE",
      selectedImage: null,
      sortTypes: [{
          text: "File Size",
          value: "FILE_SIZE",
          disabled: false,
        },
        {
          text: "File Name",
          value: "FILE_NAME",
          disabled: false,
        },
        {
          text: "File Extension",
          value: "FILE_EXTENSION",
          disabled: false,
        },
      ],
      selectedSortOrder: "ASC",
      sortOrders: [{
          text: "Asc",
          value: "ASC",
          disabled: false
        },
        {
          text: "Desc",
          value: "DESC",
          disabled: false
        },
      ],
    }),
  }
</script>