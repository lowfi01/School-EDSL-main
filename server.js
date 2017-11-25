"user strict"

var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// API
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/sportsEDSL', {useMongoClient: true});

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://lowfi:password123@ds155634.mlab.com:55634/edsl'
};

// Fix heroku
// mongoose.connect(db.mlab || db.localhost, {
//     useMongoClient: true
// });

// local environment
mongoose.connect(db.localhost, {
    useMongoClient: true
});

// MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES & IMGS
app.use(express.static('public'))


// Enable CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var Clubs = require('./models/clubs');
var Teams = require('./models/teams');
var Rounds = require('./models/rounds');
var Table = require('./models/table');
var Dates = require('./models/dates');


// ------>> dates <<< --------
app.get('/dates', (req, res) => {
    Dates
        .find({})
        .then((docs) => {
            // we could use todos[0], but passing an object allows for more customization
            // {todos, text: 'example'}
            res.send(docs);

        })
        .catch((e) => {
            res
                .status(400)
                .send(e);
        });
});
app.post('/dates', (req, res) => {

    let dates = req.body.dates;
    var date = new Dates({
        dates
    });

    // save doc & send back
    date
        .save()
        .then((doc) => {
            res.send(doc);
        }, (e) => {
            res
                .status(400)
                .send(e);
        });
});

// ------>> TABLE <<< --------
app.get('/tables/season/:currentSeason/:div', (req, res) => {
    const currentSeason = req.params.currentSeason;
    const division = req.params.div
    Table
        .find({
            currentSeason,
            division
        })
        .then((docs) => {
            // we could use todos[0], but passing an object allows for more customization
            // {todos, text: 'example'}
            res.send(docs);

        })
        .catch((e) => {
            res
                .status(400)
                .send(e);
        });
});

// app.get('/tables', (req, res) => {
//     Table
//         .find({})
//         .then((docs) => {
//             // we could use todos[0], but passing an object allows for more customization
//             // {todos, text: 'example'}
//             res.send(docs);

//         })
//         .catch((e) => {
//             res
//                 .status(400)
//                 .send(e);
//         });
// });

app.get('/tables/seasons', (req, res) => {
    Table
        .find({}, {
            currentSeason: 1,
            division: 1,
            _id: 0
        })
        .then((docs) => {
            // we could use todos[0], but passing an object allows for more customization
            // {todos, text: 'example'}
            res.send(docs);

        })
        .catch((e) => {
            res
                .status(400)
                .send(e);
        });
});

app.post('/tables/:div/:season', (req, res) => {

    // create document - using req.body.text
    console.log("hello world");
    let div = req.params.div;
    let currentSeason = req.params.season
    let term = req.body.term;
    var table = new Table({
        table: term,
        division: div,
        currentSeason
    });

    // save doc & send back
    table
        .save()
        .then((doc) => {
            console.log(`/POST table: `, doc)
            res.send(doc);
        }, (e) => {
            res
                .status(400)
                .send(e);
        });
});

// ------>> ROUND <<< --------
app.patch('/rounds/:lock/:id', (req, res) => {
    const _id = req.params.id;
    const lock = req.params.lock;

    Rounds.findOneAndUpdate({
        _id
    }, {
        '$set': {
            lock: lock
        }
    }, {
        new: true
    }).then((doc) => {
        if (!doc) {
            console.log(`this is a doc:`, doc)
            return res
                .status(404)
                .send('404');
        }
        ;
        //res.send("promise works");
        res.send({
            doc
        });
        console.log(`checking what body looks like after $push: ${doc}`);
    }).catch((e) => {
        res.send(e);
        res
            .status(400)
            .send();
    });

});


app.patch('/rounds/:home/:away/:id', (req, res) => {
    const home = req.params.home;
    const away = req.params.away;
    const _id = req.params.id;

    Rounds.findOneAndUpdate({
        _id
    }, {
        '$set': {
            goalsAway: away,
            goalsHome: home,
        }
    }, {
        new: true
    }).then((doc) => {
        if (!doc) {
            console.log(`this is a doc:`, doc)
            return res
                .status(404)
                .send('404');
        }
        ;
        //res.send("promise works");
        res.send({
            doc
        });
        console.log(`checking what body looks like after $push: ${doc}`);
    }).catch((e) => {
        res.send(e);
        res
            .status(400)
            .send();
    });

});
app.get('/rounds/:division/:season/:round', (req, res) => {
    var season = req.params.season;
    var division = req.params.division;
    var round = req.params.round

    Rounds
        .find({
            season: season,
            divCode: division,
            roundNumber: round
        })
        .then((docs) => {
            // we could use todos[0], but passing an object allows for more customization
            // {todos, text: 'example'}
            console.log(docs)
            res.send(docs);

        })
        .catch((e) => {
            res
                .status(400)
                .send(e);
        });
});

app.get('/rounds/:division/:season', (req, res) => {
    var season = req.params.season;
    var division = req.params.division;

    console.log(`division: ${division} - Season: ${season}`)
    console.log("HELLO WORLD !! ")
    console.log("HELLO WORLD !! ")
    console.log("HELLO WORLD !! ")

    Rounds
        .find({
            season: season,
            divCode: division
        })
        .then((docs) => {
            // we could use todos[0], but passing an object allows for more customization
            // {todos, text: 'example'}
            console.log(docs)
            res.send(docs);

        })
        .catch((e) => {
            res
                .status(400)
                .send(e);
        });
});


app.get('/rounds', (req, res) => {
    Rounds
        .find({})
        .then((docs) => {
            // we could use todos[0], but passing an object allows for more customization
            // {todos, text: 'example'}
            res.send(docs);

        })
        .catch((e) => {
            res
                .status(400)
                .send(e);
        });
});


app.post('/rounds', (req, res) => {

    // create document - using req.body.text
    console.log("hello world");
    let body = req.body.term;
    console.log(`POST /round:term  : `, body);
    var round = new Rounds({
        roundNumber: body.roundNumber,
        game: body.game,
        homeTeam: body.homeTeam,
        awayTeam: body.awayTeam,
        date: body.date,
        divCode: body.divCode,
        goalsHome: body.goalsHome,
        goalsAway: body.goalsAway,
        lock: body.lock,
        season: body.season,
    });

    // save doc & send back
    round
        .save()
        .then((doc) => {
            console.log(`/POST round.homeTeam: `, round.homeTeam)
            res.send(doc);
        }, (e) => {
            res
                .status(400)
                .send(e);
        });
});


// ----->> POST CLUBS <<------
app.post('/clubs', (req, res) => {
    // create document - using req.body.text
    console.log(`POST /clubs: `, req.body.clubName);
    var club = new Clubs({
        clubName: req.body.clubName,
        clubPresident: req.body.clubPresident,
        groundLocation: req.body.groundLocation,
        postalAddress: req.body.postalAddress,
        clubPhone: req.body.clubPhone,
        email: req.body.email,
        website: req.body.website,
        dateStart: req.body.dateStart,
        teams: [req.body.teams]
    });

    // save doc & send back
    club
        .save()
        .then((doc) => {
            console.log(`club name`, club.clubName)
            res.send(doc);
        }, (e) => {
            res
                .status(400)
                .send(e);
        });
});

// ------->> Update Clubs <<---------
app.patch('/clubs', (req, res) => {
    var id = req.body._id;
    var team = req.body.teams
    //var body = _.pick(req.body, ['text', 'completed']);

    Clubs.findOneAndUpdate({
        _id: id
    }, {
        $push: {
            teams: team
        }
    }, {
        new: true
    }).then((doc) => {
        if (!doc) {
            console.log(`this is a doc:`, doc)
            return res
                .status(404)
                .send('404');
        }
        ;
        //res.send("promise works");
        res.send({
            doc
        });
        console.log(`checking what body looks like after $push: ${doc}`);
    }).catch((e) => {
        res.send(e);
        res
            .status(400)
            .send();
    });

});

/// -----> GET CLUBS <------
app.get('/clubs', (req, res) => {
    // .find() get everything old code - Todo.find().then((todos) changed code -
    // find only _creator : ObjectId that match users ObjectId
    Clubs
        .find({})
        .then((docs) => {
            // we could use todos[0], but passing an object allows for more customization
            // {todos, text: 'example'}
            res.send(docs);

        })
        .catch((e) => {
            res
                .status(400)
                .send(e);
        });
});


/// -----> GET TEAMS <------
app.get('/teams/:id', (req, res) => {
    // .find() get everything old code - Todo.find().then((todos) changed code -
    // find only _creator : ObjectId that match users ObjectId

    // new  
    var div = req.params.id;
    console.log(`div = ${div}`)
    Teams
        .find({
            'division.divCode': {
                '$ne': `${div}`
            }
        })
        .then((docs) => {
            // we could use todos[0], but passing an object allows for more customization
            // {todos, text: 'example'}
            res.send(docs);
            console.log()

        })
        .catch((e) => {
            res
                .status(400)
                .send(e);
        });
});

/// ---->GET TEAMS FILTERED BY DIVISION<--------
// app.get(`/teams/:id`, (req, res) => {
app.get(`/divisions/:id`, (req, res) => {
    // .find() get everything old code - Todo.find().then((todos) changed code -
    // find only _creator : ObjectId that match users ObjectId
    var div = req.params.id;
    console.log(`this is the get request:`, req.params.id)
    Teams
        .find({
            'division.divCode': `${div}`
        })
        .then((docs) => {
            // we could use todos[0], but passing an object allows for more customization
            // {todos, text: 'example'}
            res.send(docs);

        })
        .catch((e) => {
            res
                .status(400)
                .send(e);
        });
});

// ----->> PATCH TEAMS <<-----------

app.patch('/teams/:id', (req, res) => {
    // :id variable is the objectId
    var _id = req.params.id

    // req.body - is the object we will be passing in axios
    var term = req.body.term;
    //var body = _.pick(req.body, ['text', 'completed']);

    Teams.findOneAndUpdate({
        _id
    }, {
        $set: {
            'division.divCode': term
        }
    }, {
        new: true
    }).then((doc) => {
        if (!doc) {
            console.log(`this is the doc`, doc)
            return res
                .status(404)
                .send('404');
        }
        ;
        //res.send("promise works");
        res.send({
            doc
        });
        console.log(`checking what body looks like after $push: ${doc}`);
    }).catch((e) => {
        res.send(e);
        res
            .status(400)
            .send();
    });

});

// ----->> POST TEAMS <<------
app.post('/teams', (req, res) => {
    // create document - using req.body.text
    console.log(`POST /teams`, req.body.teamName);
    var team = new Teams({
        teamName: req.body.teamName,
        club: {
            name: req.body.name,
            location: req.body.location
        },
        division: {
            divCode: req.body.divCode,
            divGrade: req.body.divGrade,
            sponsor: req.body.sponsor
        },
        seasonYear: req.body.seasonYear,
        captain: req.body.captain,
        coach: req.body.coach,
        contactPhone: req.body.contactPhone,

    });

    // save doc & send back
    team
        .save()
        .then((doc) => {
            res.send(doc);
        }, (e) => {
            res
                .status(400)
                .send(e);
        });
});


app.get('*', (req, res) => {
    // resolve & sendFile, public/index.html
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})




app.listen(port, () => {
    console.log(`server is live on ${port}!`);
})