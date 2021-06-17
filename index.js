    var express = require("express");
    var app = express();
    var port = 3000

    const movies = [
        { title: 'Jaws', year: 1975, rating: 8 },
        { title: 'Avatar', year: 2009, rating: 7.8 },
        { title: 'Brazil', year: 1985, rating: 8 },
        { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
    
    ]

    const orderedMovies = movies.slice().sort((a, b) => a.year - b.year)
    const orderedMoviesByRating = movies.slice().sort((a, b) => a.rating - b.rating)

    app.get("/", (req, res)=> {
    res.send("ok");
    });

    app.get("/test", (req, res)=> {
    res.send({status:200, message:"ok"});
    });

    app.get("/time", (req, res)=> {
        res.send({status:200, message:"14:20"});
    });

    var today = new Date();
    var Time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    app.get('/time', (req, res) => {

    res.send({
        status: 200,
        message: Time
    })
    });
    app.get('/hello/:id', (req, res) => {
    var id = req.params.id;
    if (id !== undefined) {
        res.send({
            status: 200,
            message: "Hello, " + id
        })
    }
    });


    app.get('/hello', (req, res) => {
        var id = req.params.id;
        if (id !== undefined) {
            res.send({
                status: 200,
                message: "Hello"
            })
        }
        });

    app.get('/search', (req, res) => {
    var search = req.query.s;
    if (search !== undefined) { 
        res.send({
            status:200, 
            message:"ok", 
            data :search
        })
    }
    else {
        console.log(res.status(500))
        res.send({
            status:500, 
            error:true, 
            message:"you have to provide a search"
            
        })
    }
    });
    app.post("/movies/add", (req,res) => {

        const movie = {
          title : req.body.title,
          year : req.body.year,
          rating : req.body.rating
        };
        if(movie.rating == undefined) {
          movie.rating = 4;
        }
        if ((movie.title) == 'undefined' || (movie.year == 'undefined') || (isNaN(movie.year)) || (movie.year.toString().length !== 4)){
          res.json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'});
          console.log(res.json)
        }
        else{
          movies.push(movie);
          res.send(movie);
          res.json({status: 200, message: 'ok' , data: movies})
        }
      });
    
    app.get("/movies/get", (req, res)=> {
        res.send({
            status:200, 
            data: movies
        });
    });



    app.get("/movies/get/by-date", (req, res)=> {
        res.send({
            status:200, 
            data: orderedMovies
        });
    });


    app.get("/movies/get/by-rating", (req, res)=> {
    res.send({
        status:200, 
        data: orderedMoviesByRating
        });
    });

    app.get("/movies/get/by-title", (req, res)=> {
        res.send({
            status:200, 
            data: movies.sort(function compare( a, b ) {
            if ( a.title < b.title ){
                return -1;
                }
                if ( a.title > b.title ){
                return 1;
                }
                return 0;
              }
            )  
        });
    });

    app.get("/movies/get/id/:id", function(req, res) {
        const id = parseInt(req.params.id);
      
        if(id <= movies.length && id > 0) {
          res.send({status: 200, data: movies[id-1]
          })
        } else {
            console.log(res.status(404))
          res.send({status: 404, error: 'true', message:'the movie ' + id + ' does not exist'})
          }
      });
app.put("/movies/update/:Id", (req, res) => {
    let id=req.params.Id;
    var updatedTitle=req.body.title;
    var updatedRating=req.body.rating;
    var updatedYear=req.body.year;

    if ( id > 0 && id < movies.length){
        if(updatedTitle != movies[id].title && updatedTitle != ""){
            movies[id].title=updatedTitle;
        }
        else if(updatedYear != movies[id].year && updatedYear.length === 4){ 
             movies[id].year=updatedYear;
        }
        else if( updatedYear.length !== 4){ 
            res.json({error:true, message: "can't update"})
        }
        else if(updatedRating!=movies[id].rating){
             movies[id].rating=updatedRating;
        }
    res.send({status:200, data: movies})
    }
    else{
        res.send({error:true, message:`movie of this ${id} does not exist`})
    }
   
    });
    
    app.delete("/movies/delete/:id", (req,res) => {
        const id = parseInt(req.params.id);
        
        if (id>movies.length || id<=0){
           res.send({status:404, error:true, message:`the movie ${id} does not exist`})
        }
        else{
            movies.splice(id-1,1);
            res.send(movies);
        }
     });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })
