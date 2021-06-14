    var express = require("express");
    var app = express();
    var port = 3000

    const movies = [
        { title: 'Jaws', year: 1975, rating: 8 },
        { title: 'Avatar', year: 2009, rating: 7.8 },
        { title: 'Brazil', year: 1985, rating: 8 },
        { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
    ]

    app.get("/", (req, res)=> {
    res.send("ok");
    });

    app.get("/test", (req, res)=> {
    res.send("status:200, message:ok");
    });


    // app.get("/time", (req, res)=> {
    //     res.send("status:200, message:14:20");
    // });

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
            message: "Hello," + id
        })
    }
    else {
        res.send({
            status: 200,
            message: "Hello,"
        })
    }
    });
    app.get('/search', (req, res) => {
    var search = req.query.s;
    if (search !== undefined) {
        res.send({
            status:200, 
            message:"ok", 
            data: search
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

    app.get("/movies/add", (req, res)=> {
        res.send();
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
    
    
    app.get("/movies/edit", (req, res)=> {
        res.send();
    });
    
    app.get("/movies/delete", (req, res)=> {
        res.send();
    });
    
    app.listen(3000);