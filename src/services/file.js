const fs = require('fs')
const mime = require('mime-types')
const { DateTime } = require('luxon')

module.exports = {
    async save(buffer, message){
        const now = DateTime.now().setZone('America/Sao_Paulo').toMillis()
        const fileName = `tmp/file_${now}.${mime.extension(message.mimetype)}`
        await fs.writeFile(fileName, buffer, err => {
            console.error(err)
        })
        return fileName
    },

    get(fileName=''){
        console.log('chegou aqui')
        return fs.createReadStream(fileName)
    }
}