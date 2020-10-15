export {
  getImageInfo,
  getImagesInfo,
  convertPrecentageToFloat,
  isValidCompressionQuality,
  removeDir,
  zipFolder,
  copy,
  getUniqueUID,
  getMbSize,
  getKbSize,
  getViewURL,
  getCenterOffset,
  isDevelopment,
}

const config = require('../config')

const {
  statSync,
  rmdir
} = require("fs")
const {
  basename,
  extname
} = require("path")

const {
  zip
} = require("zip-a-folder")
const fsExtra = require("fs-extra")

import {
  v4 as uuidv4
} from 'uuid';

const isDevelopment = process.env.NODE_ENV !== "production"

function getImagesInfo(filePaths) {
  if (!filePaths) return []
  if (!filePaths.length) return []
  return filePaths.map(path => {
    return getImageInfo(path)
  })
}

function getImageInfo(path) {
  try {
    const imgSize = statSync(path)

    const imgSchma = {
      filePath: path,
      fileName: basename(path),
      fileExtension: extname(basename(path)),
      fileSize: imgSize.size,
      selected: true,
    }
    return imgSchma

  } catch (err) {
    console.log("error in get image info:", err)
    return {}
  }
}

function removeDir(src, opts) {
  rmdir(src, opts, err => {
    if (err) {
      throw err
    }
    console.log(`Temp folder: ${src} is deleted!`)
  })
}

async function zipFolder(sourcePath, outputPath) {
  await zip(sourcePath, outputPath)
}

async function copy(src, dest) {
  await fsExtra.copy(src, dest)
}

function isValidCompressionQuality(val) {
  return val >= config.COMPRESSION_MIN && val <= config.COMPRESSION_MAX
}

function getUniqueUID() {
  return uuidv4()
}

function getMbSize(size) {
  return `${(size / 1000000.0).toFixed(2)}mb`
}

function getKbSize(size) {
  return `${(size / 1000.0).toFixed(2)}kb`
}

function convertPrecentageToFloat(val) {
  return parseFloat((val / 100).toFixed(2))
}
// #iss14
function getCenterOffset(parentPos, parentSize, childSize) {
  console.log("pP: ", parentPos,"pS:",parentSize,"cS: ", childSize)
  return {
    x: parseInt(parentPos[0] + (parentSize[0] / 2) - (childSize[0] / 2))),
    y: parseInt(parentPos[1] + (parentSize[1] / 2) - (childSize[1] / 2)))
  }
}


// TODO : clean params obj if special chars exist, add function to automatically return key value as url params key=value, instead of key:value, basicall iterate over each key value and generate a string formatted key=value params
// TODO : change params to {key : value} pairs
function getViewURL(path, name) {
  return isDevelopment ?
    `${process.env.WEBPACK_DEV_SERVER_URL}/#${path}` :
    `app://./index.html#${name}`
}