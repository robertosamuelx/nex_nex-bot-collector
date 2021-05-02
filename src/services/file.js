const fs = require('fs')
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

    get(fileName=''){
        return fs.createReadStream(fileName)
    }
}