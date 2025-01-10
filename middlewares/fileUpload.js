const multer = require('multer')
const fs = require('fs')  //file system
const path = require('path') //path

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const file_destination = 'public/uploads'

        if (!fs.existsSync(file_destination)) {
            fs.mkdirSync(file_destination, { recursive: true })
        }

        cb(null, file_destination)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // abc.jpeg - originalname
        // extname = '.jpeg'
        const extname = path.extname(file.originalname)
        const basename = path.basename(file.originalname, extname)

        const filename = `${file.fieldname}-${basename}-${uniqueSuffix}${extname}`

        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/[.](jpg|jpeg|png|svg|JPG|JPEG|PNG|SVG)$/)){
        cb(new Error("FILE TYPE INVALID"), false)
    }
    cb(null, true)
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter: fileFilter
 })

 module.exports = upload