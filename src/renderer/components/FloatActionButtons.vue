<template>
    <div style="position:fixed;bottom:30px;right:20px;z-index:100;" v-if="!hasBeenCompressed">
        <div class="mb-6" v-if="hasImages">
            <FloatActionButton v-for="(button, i) in buttons.preCompressBtns" :key="i" :color="button.color"
                :icon="button.icon" :title="button.title" @clicked="button.clicked" />
        </div>
        <div v-else>
            <FloatActionButton :color="buttons.selectImageBtn.color"
                :icon="buttons.selectImageBtn.icon" :title="buttons.selectImageBtn.title" @clicked="buttons.selectImageBtn.clicked" />
        </div>
    </div>
    <div style="position:fixed;bottom:30px;right:20px;z-index:100;" v-else>
        <v-col>
            <FloatActionButton v-for="(button, i) in buttons.postCompressBtns" :key="i" :color="button.color"
                :icon="button.icon" :title="button.title" @clicked="button.clicked" />
        </v-col>
    </div>
</template>

<script>
    // TODO: re implemet the conditional section that relies on has images and images been compressed
    import FloatActionButton from "./FloatActionButton.vue"
    import {
        bus
    } from "@/main"

    export default {
        name: "FloatActionButtons",
        props: {
            hasBeenCompressed: Boolean,
            hasImages: Boolean
        },
        data: () => ({
            buttons: {
                selectImageBtn:{
                        title: "Add New Images",
                        color: "blue",
                        icon: "mdi-plus",
                        clicked: () => {
                            bus.$emit("bus-add-images")
                        }
                },
                preCompressBtns: [{
                        title: "Compress Images",
                        color: "green",
                        icon: "mdi-check",
                        clicked: () => {
                            bus.$emit("bus-compress-images")
                        }
                    },
                    {
                        title: "Cancel",
                        color: "red",
                        icon: "mdi-window-close",
                        clicked: () => {
                            bus.$emit("bus-clear-images")
                        }
                    },
                    {
                        title: "Add Images",
                        color: "blue",
                        icon: "mdi-plus",
                        clicked: () => {
                            bus.$emit("bus-add-images")
                        }
                    }
                ],
                postCompressBtns: [{
                    title: "Save Compressed Images",
                    color: "blue",
                    icon: "mdi-download",
                    clicked: () => {
                        bus.$emit("bus-download-images")
                    }
                }]
            }
        }),
        components: {
            FloatActionButton,
        },
    }
</script>