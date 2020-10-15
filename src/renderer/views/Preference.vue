<template>
  <v-container class="preference">
    <PreferenceContainer />
  </v-container>
</template>

<script>
import PreferenceContainer from "@/components/Preference/Preference.vue"
import {
  bus
} from "@/main"

export default {
  name: "Preference",
  components: {
    PreferenceContainer,
  },
  created(){
    console.log("preference route created")
    bus.$on("bus-preference-save-triggered",(payload) => {
        console.log("e: bus-preference-save-triggered")
        this.$store.commit("updatePreference", payload)
        // close preference window
        window.ipcRenderer.send("close-preference-window")

        // send to main process and then main window
        window.ipcRenderer.send("updated-preference")

        // TODO : add feature to emit save status to main window
        // #feat12
        // this.$toast.success({ message: "Preferences Saved!", title: "success" })
    })

    bus.$on("bus-preference-cancel-triggered",() => {
        console.log("e: bus-preference-cancel-triggered")
        window.ipcRenderer.send("close-preference-window")
    })
  }
}
</script>

<style>
html{
  overflow-y: hidden;
}
.preference{
  padding:25px;
}
</style>