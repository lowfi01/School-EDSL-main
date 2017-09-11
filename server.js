"user strict"

var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// API
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sportsEDSL', {useMongoClient: true});

// MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES & IMGS
app.use(express.static('public'))

var Clubs = require('./models/clubs');
var Teams = require('./models/teams');

// ----->> POST CLUBS <<------
app.post('/clubs', (req, res) => {
    // create document - using req.body.text
    console.log(req.body.clubName);
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
            console.log(club.clubName)
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
    }, {new: true}).then((doc) => {
        if (!doc) {
            console.log(doc)
            return res
                .status(404)
                .send('404');
        };
        //res.send("promise works");
        res.send({doc});
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
app.get('/teams', (req, res) => {
    // .find() get everything old code - Todo.find().then((todos) changed code -
    // find only _creator : ObjectId that match users ObjectId
    Teams
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

app.get(`/teams/:id`, (req, res) => {
    // .find() get everything old code - Todo.find().then((todos) changed code -
    // find only _creator : ObjectId that match users ObjectId
    var div = req.params.id;
    console.log(req.params.id)
    Teams
        .find( {'division.divCode' : `${div}`})
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

// ----->> POST TEAMS <<------
app.post('/teams', (req, res) => {
    // create document - using req.body.text
    console.log(req.body.teamName);
    var team = new Teams({
        teamName: req.body.teamName,
        club: req.body.club,
        division: {
            divCode: req.body.divCode,
            divGrade: req.body.divGrade,
            sponsor: req.body.sponsor
        },
        seasonYear: req.body.seasonYear,
        captain: req.body.captain,
        coach: req.body.coach,
        contactPhone: req.body.contactPhone
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
    res.sendFile(path.resolve(__dirname, 'public', 'index.html' ))
})




app.listen(3000, () => {
    console.log('server is live on 3000!');
})