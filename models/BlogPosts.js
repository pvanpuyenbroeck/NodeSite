var mongoose	= require("mongoose");

var pictureSchema = new mongoose.Schema({
    titel: String,
    description: String,
    url: String,
    datum: Date
});

module.exports = mongoose.model("blogPost", pictureSchema);