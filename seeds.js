
var mongoose = require("mongoose");
var Film = require("./models/film");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Parasite", 
        image: "https://m.media-amazon.com/images/M/MV5BOWVmODY4MjYtZGViYS00MzJjLWI3NmItMGFmMDRkMzI1OTU3XkEyXkFqcGdeQXVyNTQ0NTUxOTA@._V1_UY1200_CR135,0,630,1200_AL_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }
    },
    {
        name: "Psycho", 
        image: "http://t1.gstatic.com/images?q=tbn:ANd9GcRicca1uD1bCkKQF3FqdlhTpxRnsetHxLWfQPXU8B1Mt-uqXYHr",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff71",
            username: "Jill"
        }
    },
    {
        name: "Moonlight", 
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bset-kids-movies-2019-aladdin-1555082928.jpg?crop=0.9879401833092136xw:1xh;center,top&resize=480:*",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff77",
            username: "Jane"
        }
    }
]
 
function seedDB(){
   //Remove all films
   Film.deleteMany({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed films!");
        Comment.deleteMany({}, function(err) {
            if (err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few films
            data.forEach(function(seed){
                Film.create(seed, function(err, film){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a film");
                        //create a comment
                        Comment.create(
                            {
                                text: "This is my favorite Film ever",
                                author:{
                                    id : "588c2e092403d111454fff76",
                                    username: "Jack"
                                }
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    Film.comments.push(comment);
                                    Film.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        })
    }); 
    //add a few comments
}
 
module.exports = seedDB;