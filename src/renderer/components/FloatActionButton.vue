<template>
    <v-col>
        <v-btn :title="title" dark fab class="mx-2" v-on:click="onClicked" large :color="color">
            <v-icon dark>{{icon}}</v-icon>
        </v-btn>
    </v-col>
</template>

<script>
    export default {
        name: "FloatActionButton",
        props: {
            title: String,
            color: String,
            icon:String,
        },
        methods:{
            onClicked: function(){
                this.$emit("clicked")
            }
        }
    }
</script>