const path = require("path")

const APP_NAME = "Image Compress Tool"
const APP_DEVELOPER =  require("../package.json").author.name
const APP_DESCRIPTION = require("../package.json").description
const APP_VERSION = require("../package.json").version
const APP_CONTACT_EMAIL = require("../package.json").author.email
const APP_WEBSITE = require("../package.json").author.url
const APP_LICENSE = require("../package.json").license
const APP_CONTACT_PHONE = "501-000-0000"

const APP_INFO = {
  APP_NAME,
  APP_VERSION,

  APP_DESCRIPTION,
  APP_CONTACT_EMAIL,
  APP_DEVELOPER,
  APP_LICENSE,

  GITHUB_URL_RELEASES: APP_WEBSITE,
  GITHUB_URL: APP_WEBSITE,
  TWITTER_PAGE_URL: APP_WEBSITE,
  GITHUB_URL_ISSUES: APP_WEBSITE,
}

module.exports = {
  APP_INFO,
  
  APP_ICON: path.join(__dirname, "..", "static", "ImageCompress"),
  APP_WINDOW_TITLE: APP_NAME,
  WINDOW_INITIAL_BOUNDS: {
    width: 1200,
    height: 675,
  },
  WINDOW_MIN_HEIGHT: 558,
  WINDOW_MIN_WIDTH: 992,

  COMPRESSION_MIN: 10,
  COMPRESSION_MAX: 90,
}
