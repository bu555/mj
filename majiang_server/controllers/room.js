
// const TestModel = require('../models/schema/testSchema') 
// const myUtill = require('../models/utill')
class Room {
    constructor(code){
        this.code = code
        this.player = []
    }
    addPlayer(options={}){
        this.player.push({
            id:options.id,
            name:options.name
        })
    }




}


module.exports = Room