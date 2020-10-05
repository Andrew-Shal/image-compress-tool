const path = require("path")

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/renderer"),
      },
    },
  },
  chainWebpack: config => {
    // Remove the old 'app' entry
    config.entryPoints.delete("app")
    // Add the new 'plugin' entry
    config.entry("app").add("./src/renderer/main.js")
  },
}