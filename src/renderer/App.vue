<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    // toast is the app's ui activity notifier
    // this is used in the store on commits, dispatches and setting updates, easier to have direct access in store
    this.$store.commit("setToast", this.$toast)
  },
}
</script>
