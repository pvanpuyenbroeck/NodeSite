var express     = require("express");
var router      = express.Router();
var BlogPost    = require("../models/BlogPosts");
var dateFormat  = require('dateformat');

// var middleware  =  require("../middelware");

router.post("/BlogPosts", function(req,res){
	var titel = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var now = new Date();

	var newBlogPost = {titel: titel, url:image,description:desc, datum: now};
	req.fields;
	req.files;
	
	//create a new blogpost en save in database
	BlogPost.create(newBlogPost, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			console.log(newlyCreated);
			res.redirect("/");
		}
	});
});

//Edit route
router.get("/blogpost/:id/edit", function(req, res){
	BlogPost.findById(req.params.id, function(err, foundBlogPost){
			if (err) {
				req.flash("error", "Blogpost not found");
			}
				res.render("blogpost/edit", {blogpost: foundBlogPost});
	});
})

//show full description
router.get("/blogpost/:id/index", function(req, res){
	BlogPost.findById(req.params.id, function(err, foundBlogPost){
			if (err) {
				req.flash("error", "Blogpost not found");
			}
				res.render("blogpost/index", {blogpost: foundBlogPost});
	});
});

//Delete route
router.post("/blogpost/:id", function(req, res){
	console.log("test");
	BlogPost.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			res.redirect("/");
		}
	});
});



module.exports = router;