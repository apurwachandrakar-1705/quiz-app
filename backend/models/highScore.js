const mongoose = require("mongoose")
const highScoreSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    highScore:[{
        type:Number,
        default:0
    }]
})
const HighScore = mongoose.model("HighScore",highScoreSchema)
module.exports = HighScore