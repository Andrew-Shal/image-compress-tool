<template>
  <v-dialog @click:outside="closeDialog" :value="overlay" max-width="1200">
    <v-card>
      <v-card-title class="headline">Compare original to compressed</v-card-title>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-subheader>Zoom</v-subheader>
            <v-slider
              :value="zoomSlider"
              :max="maxBoundZoom"
              :min="minBoundZoom"
              @input="updateImageWidth"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="imgWidth"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="6" style="overflow:hidden;">
            <v-col sm="12" class="sub-container-1">
              <div
                class="scrollable"
                ref="img_cont"
                :style="{ overflow: imgWidth <= minBoundZoom ? 'hidden' : 'scroll' }"
              >
                <img
                  :style="{ width: imgWidth + 'px' }"
                  v-bind:src="selectedImage.filePath"
                  alt
                  class="inner-scrollable"
                />
              </div>
            </v-col>
            <ul>
              <li>{{ selectedImage.fileName }}</li>
              <li>{{ selectedImage.filePath }}</li>
              <li>{{ selectedImage.fileExtension }}</li>
              <li>{{ getKbSize(selectedImage.fileSize) }}</li>
            </ul>
          </v-col>
          <v-col cols="6" style="overflow:hidden;">
            <v-col sm="12" class="sub-container-2">
              <div
                class="scrollable"
                :style="{ overflow: imgWidth <= minBoundZoom ? 'hidden' : 'scroll' }"
              >
                <img
                  :style="{ width: imgWidth + 'px' }"
                  v-bind:src="selectedImage.compressed.filePath"
                  alt
                  class="inner-scrollable"
                />
              </div>
            </v-col>
            <ul>
              <li>{{ selectedImage.compressed.fileName }}</li>
              <li>{{ selectedImage.compressed.filePath }}</li>
              <li>{{ selectedImage.compressed.fileExtension }}</li>
              <li>{{ getKbSize(selectedImage.compressed.fileSize) }}</li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ImageComparer",
  props: { selectedImage: Object, overlay: Boolean, closeDialog: Function },
  data: () => ({
    maxBoundZoom: 0,
    minBoundZoom: 0,
    zoomSlider: 0,
    imgWidth: 0,
  }),
  computed: {},
  methods: {
    getKbSize: function(size) {
      return `${(size / 1000.0).toFixed(2)}kb`
    },
    updateImageWidth(val) {
      this.imgWidth = val
    },
  },
  mounted() {
    const _upperBound = 12000
    const _minBoundZoom = this.$refs.img_cont.clientWidth
    const _maxBoundZoom = _minBoundZoom + _upperBound
    const _defaultZoom = _maxBoundZoom
    this.imgWidth = _defaultZoom

    this.minBoundZoom = _minBoundZoom
    this.maxBoundZoom = _maxBoundZoom
    this.zoomSlider = _maxBoundZoom
  },
}
</script>
<style>
.scrollable {
  width: 100%;
  height: 200px;
  overflow: scroll;
  position: relative;
}
.inner-scrollable {
  position: absolute;
}
/* .sub-container-1,
.sub-container-2 {
  width: 50%;
} */
.v-overlay__content {
  width: 80%;
}
</style>
