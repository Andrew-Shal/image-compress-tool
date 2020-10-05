export {
    compress,
}

const imagemin = require("imagemin")
const imageminPngquant = require("imagemin-pngquant")
const imageminJpegoptim = require("imagemin-jpegoptim")

// for imagemin
const convertToUnixPath = require('slash');

const helper = require('./helper')

async function compress(filepath,outpath,settings){
    const src = convertToUnixPath(filepath)
    const dest = convertToUnixPath(outpath)
    
    const opts = {
        destination: dest,
        plugins: [
          imageminJpegoptim({
            stripAll: settings.stripmarkers,
            progressive: settings.progressive,
            max: settings.quality,
          }),
          imageminPngquant({
            strip: settings.stripmarkers,
            quality: [
              helper.convertPrecentageToFloat(settings.quality - 1),
              helper.convertPrecentageToFloat(settings.quality + 1),
            ],
          }),
        ],
    }

    const res = await imagemin([src],opts).catch(err => {console.log("res: " ,res);throw new Error(err)})
    return res.pop()
}