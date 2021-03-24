require('dotenv').config()
const venom = require('venom-bot')
const utils = require('./utils')
const api = require('./services/api')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.listen(5000 || process.env.PORT, () => {
    console.log('server bot is running')
})

venom.create(
    'nex',
    undefined,
    (statusSession, session) => {
        console.log('Status session:\t' + statusSession)
        console.log('Session:\t' + session)
    }, 
    utils.options
).then( async (client) => {

    app.post('/response', async (req, res) => {
        const { body } = req
        await client.sendText((body.to+'@c.us'), body.message)
        return res.status(200).json({response: 'success'})
    })

    app.get('/contacts', async (req, res) => {
        const contacts = await client.getAllContacts()
        const response =  contacts.map(contact => {
            return {
                number: contact.id.user,
                name: contact.name
            }
        })
        return res.status(200).json(response)
    })

    app.get('/contacts/:id', async (req, res) => {
        const contacts = await client.getAllContacts()
        const { id } = req.params
        const response = contacts.filter(contact => contact.id.user === id)
        return res.status(200).json(response)
    })

    app.get('/start', (req, res) => {
        console.log('the application has been started')
        return res.status(200).json({'response': 'OK'})
    })
    
    client.onMessage( async (message) => {
        const user = message.from
        console.log(user)
        const msg = message.body.toLowerCase()

        const result = await api
            .setUser(user)
            .setBody(msg)
            .setType(message.isMedia || message.isMMS ? 'media' : 'text')
            .setTo(process.env.MY_NUMBER)
            .sendMessage()

        if(result.response !== '')
            await client.sendText(user, result.response).then(() => {console.log('sucess')}).catch(err => {console.log(err)})

    })
    }).catch( err => {
        console.log('Error: '+ err)
    })