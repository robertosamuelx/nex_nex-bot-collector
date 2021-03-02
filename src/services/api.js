const axios = require('axios').default
const Message = require('../models/message')

module.exports = {

    setUser(user = ''){
        Message.user = user.split('@')[0]
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

    async sendMessage(){
        const { data } = await axios.post(process.env.MESSAGE_ENDPOINT, Message)
        return data
    }
}