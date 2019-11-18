var express = require("express");
var router  = express.Router();
var Film = require("../models/film");
var middleware = require("../middleware");


//INDEX - show all films
router.get("/", function(req, res){
    // Get all films from DB
    Film.find({}, function(err, allFilms){
       if(err){
           console.log(err);
       } else {
          res.render("films/index",{films:allFilms});
       }
    });
});

//CREATE - add new film to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to films array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newFilm = {name: name, image: image, price: price, description: desc, author:author}
    // Create a new film and save to DB
    Film.create(newFilm, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to films page
            console.log(newlyCreated);
            res.redirect("/films");
        }
    });
});

//NEW - show form to create new film
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("films/new"); 
});

// SHOW - shows more info about one film
router.get("/:id", function(req, res){
    //find the film with provided ID
    Film.findById(req.params.id).populate("comments").exec(function(err, foundFilm){
        if(err){
            console.log(err);
        } else {
            console.log(foundFilm)
            //render show template with that film
            res.render("films/show", {film: foundFilm});
        }
    });
});

// EDIT film ROUTE
router.get("/:id/edit", middleware.checkFilmOwnership, function(req, res){
    Film.findById(req.params.id, function(err, foundfilm){
        res.render("films/edit", {film: foundfilm});
    });
});

// UPDATE film ROUTE
router.put("/:id",middleware.checkFilmOwnership, function(req, res){
    // find and update the correct film
    Film.findByIdAndUpdate(req.params.id, req.body.film, function(err, updatedfilm){
       if(err){
           res.redirect("/films");
       } else {
           //redirect somewhere(show page)
           res.redirect("/films/" + req.params.id);
       }
    });
});

// DESTROY film ROUTE
router.delete("/:id",middleware.checkFilmOwnership, function(req, res){
   Film.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/films");
      } else {
          res.redirect("/films");
      }
   });
});


module.exports = router;
