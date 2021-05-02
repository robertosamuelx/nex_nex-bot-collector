const axios = require('axios').default
const Message = require('../models/message')
const { DateTime } = require('luxon')
const FormData = require('form-data')
const file = require('./file')

module.exports = {

    setUser(user = ''){
        Message.user = user.split('@')[0]
        return this
    },

    setTo(to=''){
        Message.to = to
        return this
    },

    setBody(body = ''){
        Message.body = body
        return this
    },

    setType(type){
        Message.type = type
        return this
    },

    setDate(date){
        Message.date = date
        return this
    },

    async sendFileMessage(fileName){
        const form = new FormData()
        form.append('user', Message.user)
        form.append('to', Message.to)
        form.append('type', Message.type)
        form.append('date', DateTime.now().setZone('America/Sao_Paulo').toJSDate().toString())
        form.append('file', file.get(fileName))
        form.append('body', Message.body)
        const { data } = await axios.post(process.env.MESSAGE_ENDPOINT, form, { headers: { ...form.getHeaders() } })
        return data
    },

    async sendMessage(){
        Message.date = DateTime.now().setZone('America/Sao_Paulo').toJSDate()
        const { data } = await axios.post(process.env.MESSAGE_ENDPOINT, Message)
        return data
    }
}