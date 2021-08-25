require('dotenv').config()
const venom = require('venom-bot')
const utils = require('./utils')
const api = require('./services/api')
const express = require('express')
const app = express()
const cors = require('cors')
const file = require('./services/file')

app.use(cors())
app.use(express.json())
app.listen(process.env.PORT, () => {
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
        const filter = req.headers['filter']
        const mappedContacts = contacts.map(contact => { return { number: contact.id.user, name: contact.formattedName} })
        if(filter === "")
            return res.status(200).json(mappedContacts)
        else
            return res.status(200).json(mappedContacts.filter(contact => contact.name.includes(filter)))
    })

    app.get('/contacts/:id', async (req, res) => {
        const contacts = await client.getAllContacts()
        const { id } = req.params
        const response = contacts.filter(contact => contact.id.user === id)
        return res.status(200).json(response)
    })
    
    client.onMessage( async (message) => {
        const user = message.from
        console.log(user)

        if(message.isMedia === true && message.isGroupMsg == false && user !== 'status'){
            const buffer = await client.decryptFile(message)
            
            const fileName = await file.save(buffer, message)

            const result = await api
                .setUser(user)
                .setType('media')
                .setTo(process.env.MY_NUMBER)
                .setBody('')
                .sendFileMessage(fileName)

            if(result.response !== '')
                await client.sendText(user, result.response).then(() => {console.log('sucess')}).catch(err => {console.log(err)})
        }

        else {
            const msg = message.body.toLowerCase()
    
            const result = await api
                .setUser(user)
                .setBody(msg)
                .setType('text')
                .setTo(process.env.MY_NUMBER)
                .sendMessage()
    
            if(result.response !== '')
                await client.sendText(user, result.response).then(() => {console.log('sucess')}).catch(err => {console.log(err)})
        }
    })
    }).catch( err => {
        console.log('Error: '+ err)
    })