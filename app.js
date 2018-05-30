var express		= require("express"),
	mongoose	= require("mongoose"),
	bodyParser	= require("body-parser"),
	BlogPost 	= require("./models/BlogPosts"),
	Names 		= require("./models/Name");


//requiring routes
var blogpostRoutes = require("./routes/blogPosts");

var MyLogger = function (req, res, next) {
    console.log("Gelogd")
    next()
}

var port = "8080";


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://pvpieter.synology.me:9056/namen", function (err, db) {
    if (err) throw err
});

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/node_modules/fine-uploader/'));
app.use(MyLogger);


app.get("/", function(req, res){
	 var afbeeldingen = [];

	 BlogPost.count().exec(function (err, count){
	 	for(i = 0; i <= count; i++){
	 	var random1 = Math.floor(Math.random() * count);
	 	var random2 = Math.floor(Math.random() * count);

	 	BlogPost.findOne().skip(random1).exec(function(err, result){
			 if(err != null){
				afbeeldingen.push(result.url);
			 }
	 	})
	 	}	
	 })
	BlogPost.find({}, function(err, AllBlogPosts){
		if(err){
			console.log(err);
		}else{
			res.render("home", {BlogPosts: AllBlogPosts});
		}
	});
});

app.get("/new", function(req, res){
	res.render("new");
});

app.get("/naming", function(req, res){
	var name;
	Names.count().exec(function(err, count){
		var random = Math.floor(Math.random() * count)
		console.log(random);
		Names.findOne().skip(random).exec(
			function(err, result){
				if(err){
					console.log(err);
				}
				else{
				console.log(result);
				name = result;				
				}
			}
		)
	})
	Names.find({}, function(err, names){
		res.render("game/naming", {name: name, names: names});
	});
});

app.use(blogpostRoutes);

app.listen(port, function(){
    console.log("Server has started");
});

app.get("/fileupload", function(req, res){
	res.render("fileupload");
});

app.post("/randomName", function(req, res){
	
})
