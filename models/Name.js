var mongoose	= require("mongoose");

var namingSchema = new mongoose.Schema({
    Voornaam: String,
    Familienaam: String,
    sex: String
});

module.exports = mongoose.model("firstnames", namingSchema);