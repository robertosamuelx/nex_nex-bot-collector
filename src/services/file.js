const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
const { DateTime } = require('luxon')

module.exports = {

    createTmpPath(){
        if(!fs.existsSync('./tmp'))
            fs.mkdirSync('./tmp')
    },

    async save(buffer, message){
        this.createTmpPath()
        const now = DateTime.now().setZone('America/Sao_Paulo').toMillis()
        const fileName = `./tmp/file_${now}.${mime.extension(message.mimetype)}`
        await fs.writeFile(fileName, buffer, err => {
            console.error(err)
        })
        return fileName
    },

    async saveQRCode(matches){
        this.createTmpPath()
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