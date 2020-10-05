<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card style="position:relative;" v-long-press="500" @long-press-start="onLongPressed()">
                <v-checkbox class="image-list--item-checkbox" background-color="white" v-if="inSelectMode"
                    v-on:change="onCheckboxToggled(false)" v-model="imageData.selected"></v-checkbox>
                <v-img v-bind:src="imageData.filePath" max-height="125" min-height="125" class="grey darken-4"></v-img>
                <v-card-text>
                    <h2 class="title primary--text ellipsis">{{ imageData.fileName }}</h2>
                </v-card-text>
                <v-card-title>
                    <span class="primary--text subtitle-2">{{ getKbSize(imageData.fileSize) }}</span>
                </v-card-title>
                <template v-if="!inSelectMode">
                    <v-fade-transition>
                        <v-overlay v-if="hover" opacity="0.7" absolute color="#036358">
                            <v-container>
                                <v-row justify="end">
                                    <v-col cols="2" align-self="end" style="text-align:right;">
                                        <span title="Copy to clipboard">
                                            <v-icon v-on:click="copyToClipboard(formatAllToClipboard)"
                                                v-clipboard="formatAllToClipboard">mdi-clipboard-outline
                                            </v-icon>
                                        </span>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col v-on:click="copyToClipboard(imageData.fileName)"
                                        v-clipboard="imageData.fileName" cols="10" class="pa-0 clickable"
                                        :title="imageData.fileName">
                                        <span class="ellipsis">
                                            <b>File Name:</b>
                                            {{ imageData.fileName }}
                                        </span>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col v-on:click="copyToClipboard(imageData.fileExtension)"
                                        v-clipboard="imageData.fileExtension" cols="10" class="pa-0 clickable"
                                        :title="imageData.fileExtension">
                                        <b>File Extension:</b>
                                        {{ imageData.fileExtension }}
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col v-on:click="copyToClipboard(imageData.fileSize)"
                                        v-clipboard="imageData.fileSize" cols="10" class="pa-0 clickable"
                                        :title="imageData.fileSize">
                                        <b>File Size:</b>
                                        {{ getKbSize(imageData.fileSize) }}
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col v-on:click="copyToClipboard(imageData.filePath)"
                                        v-clipboard="imageData.filePath" cols="10" class="pa-0 clickable"
                                        :title="imageData.filePath">
                                        <span class="ellipsis">
                                            <b>File Path:</b>
                                            {{ imageData.filePath }}
                                        </span>
                                    </v-col>
                                </v-row>
                                <v-row justify="end">
                                    <v-col xl="3" lg="4" md="6" sm="6" class="px-0" style="text-align:center;">
                                        <v-btn v-on:click="onOpenPreviewBtnClicked()" depressed small color="blue">
                                            preview</v-btn>
                                    </v-col>
                                    <v-col xl="3" lg="4" md="6" sm="6" class="px-0" style="text-align:center;">
                                        <v-btn v-on:click="onRemoveImageBtnClicked(imageData.filePath)" depressed small
                                            color="error">
                                            remove</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-overlay>
                    </v-fade-transition>
                </template>
            </v-card>
        </template>
    </v-hover>
</template>
<style>
    .image-list--item-checkbox {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        margin: 0;
        padding: 0;
    }
</style>
<script>
    import utils from "@/utils"

    export default {
        name: "ImageListItem",
        components: {},
        props: {
            imageData: Object,
            inSelectMode: Boolean,
        },
        methods: {
            // helper
            getKbSize: function (val) {
                return utils.getKbSize(val)
            },
            // events
            onLongPressed() {
                this.$emit("long-pressed")
            },
            onCheckboxToggled(flag) {
                this.$emit("chekbox-toggled", flag)
            },
            onRemoveImageBtnClicked(val) {
                this.$emit("remove-item", val)
            },
            onOpenPreviewBtnClicked() {
                this.$emit("preview-btn-triggered", this.imageData)
            },

            //  handler
            copyToClipboard: function (data) {
                this.$toast.success({
                    title: "Copied",
                    message: `${data} to clipboard`
                })
            },
        },
        computed: {
            formatAllToClipboard: function () {
                return `File Name: ${this.imageData.fileName}, File Extension: ${this.imageData.fileExtension}, File Size: ${this.imageData.fileSize}, File Path: ${this.imageData.filePath}`
            },
        },
    }
</script>