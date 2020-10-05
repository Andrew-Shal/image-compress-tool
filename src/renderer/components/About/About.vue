<template>
    <Fragment v-if="applicationInfo">
        <v-row class="content">
            <v-col sm="4">
                <v-img class="logo" src="@/assets/custom-logo.png" width="100%"></v-img>
            </v-col>
            <v-col sm="8">
                <h1 class="font-weight-bold">{{applicationInfo.APP_NAME}} <span class="font-weight-regular"></span>
                </h1>
                <h5>{{applicationInfo.APP_VERSION}} <a href="">What's new</a></h5>
                <p>
                    {{applicationInfo.APP_DESCRIPTION}}
                </p>
                <p>
                    {{applicationInfo.APP_NAME}} is a UI tool designed by {{applicationInfo.APP_DEVELOPER}}, the main purpose was to get a feel for cross-platform application development using ElectronJs and VueJs. 
                    The application uses tools such as vuetify for front end development, electron's v8 chromium browser as a container for the Vue app, VueX, VueRouter.
                </p>
                <p>
                    If you have suggestion or want to know how it all works, feel free to get in contact with me:
                <ul v-if="applicationInfo != null">
                    <li>Email: {{applicationInfo.APP_CONTACT_EMAIL}}</li>
                    <li>Github: {{applicationInfo.GITHUB_URL}}</li>
                    <li>Issues: {{applicationInfo.GITHUB_URL_ISSUES}}</li>
                    <li>Releases: {{applicationInfo.GITHUB_URL_RELEASES}}</li>
                </ul>
                </p>
            </v-col>

        </v-row>
        <v-row class="footer">
            <v-col cols="12">
                <v-row style="text-align:center;">
                    <v-col><a>Licensing Information</a></v-col>
                    <v-col><a>End-User Rights</a></v-col>
                    <v-col><a>Privacy Policy</a></v-col>
                </v-row>
                <v-row justify="center">
                    <v-col class="disclaimer">This application is free to use and is licensed under {{applicationInfo.APP_LICENSE}} licensing terms</v-col>
                </v-row>
            </v-col>
        </v-row>
    </Fragment>
</template>
<script>
    import {Fragment} from "vue-fragment"

    export default {
        name: 'AboutContainer',
        components:{Fragment},
        props: {
            applicationInfo: Object
        }
    }
</script>