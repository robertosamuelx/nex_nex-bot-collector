const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
const { DateTime } = require('luxon')

module.exports = {
    async save(buffer, message){
        const now = DateTime.now().setZone('America/Sao_Paulo').toMillis()
        const fileName = `file_${now}.${mime.extension(message.mimetype)}`
        await fs.writeFile(fileName, buffer, err => {
            console.error(err)
        })
        return fileName
    },

    async saveQRCode(matches){
        let response = {}
        const fileName = './tmp/qrcode.png'
        response.type = matches[1]
        response.data = new Buffer.from(matches[2], 'base64')
        await fs.writeFile(fileName, response.data, 'binary', err => {
            console.error(err)
        })
        return fileName
    },

    get(fileName=''){
        return fs.createReadStream(fileName)
    },

    getAbsolutePath(fileName){
        if(path.isAbsolute(fileName))
            return fileName
        else {
            return path.resolve(fileName)
        }
    }
}