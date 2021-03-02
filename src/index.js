require('dotenv').config()
const venom = require('venom-bot')
const utils = require('./utils')
const api = require('./services/api')

venom.create(
    'nex',
    undefined,
    (statusSession, session) => {
        console.log('Status session:\t' + statusSession)
        console.log('Session:\t' + session)
    }, 
    utils.options
).then( async (client) => {
    client.onMessage( async (message) => {
        const user = message.from
        const msg = message.body.toLowerCase()

        const result = await api
            .setUser(user)
            .setBody(msg)
            .setType(message.isMedia || message.isMMS ? 'media' : 'text')
            .sendMessage()

        await client.sendText(user, result.response).then(() => {console.log('sucess')}).catch(err => {console.log(err)})

    })
    }).catch( err => {
        console.log('Error: '+ err)
    })