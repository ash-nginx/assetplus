var mongoose = require("mongoose");

var postSchema = new mongoose.Schema(
    {
        // @AssetPlus: Describe schema here
        title: { type: String, required: true},
        description: { type: String, required: true},
        poster: { type:String , required: true },
        postedDate : {type:Date, default: Date.now() }

    },
);

module.exports = mongoose.model("Post", postSchema)