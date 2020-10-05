<template>
  <Fragment v-if="!sourceImagePathsCount">
    <v-row justify="center" class="flex-item">
      <v-col md="3" lg="3" align-self="center">
        <v-img class="logo" src="@/assets/custom-logo.png" style="margin:0 auto;"></v-img>
      </v-col>
    </v-row>
    <v-row justify="center" class="flex-item"> 
      <v-col cols="12" align-self="start">
        <h1 style="text-align:center;color:#777">
          Please select some images by clicking the + button
        </h1>
      </v-col>
    </v-row>
  </Fragment>
  <ImageList v-else />
</template>
<script>
  import ImageList from "@/components/ImageList.vue"
  import {
    Fragment
  } from "vue-fragment"

  export default {
    name: "ImageListContainer",
    components: {
      ImageList,
      Fragment
    },
    computed: {
      sourceImagePathsCount() {
        return this.$store.state.sourceImagePaths.length
      },
    },
    props: ["imagePaths"],
    data: () => ({}),
  }
</script>