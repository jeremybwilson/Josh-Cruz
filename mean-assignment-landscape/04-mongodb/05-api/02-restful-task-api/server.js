var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
const server = app.listen(8000);
const io = require('socket.io')(server);
const flash = require('express-flash');

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.use(
  session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(express.static(__dirname + '/public/dist/public'));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect(
  'mongodb://localhost/quoting_dojo',
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// Routes
var QuoteSchema = new mongoose.Schema ({
  quote:{ type:String, required: true, minlength:5 }
},
  { timestamps: true }
);

var UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 4 },
    quotes: [{
      quote: {
        type: String,
        required: true,
        minlength: 6,
      },
      createdAt: Number
    }],
    // quotes: [QuoteSchema],
  },
  { timestamps: true }
);

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

// Root Request
app.get('/', function(req, res) {
  res.render('index');
});

// Add User Request
app.post('/process', function(req, res) {
  console.log('POST DATA', req.body);
  var user = new User({ name: req.body.name, quotes: req.body.quote });
  var wisdom = [];

User.findOneAndUpdate({ name: user.name }, { name: user.name, $push: { quotes: { quote: req.body.quote, createdAt: Date.now() } }  }, { upsert: true, new: true }, function(err, doc) {
      if (err) {return res.send(500, { error: err });}
      console.log('doc: ', doc);
      console.log('error:', err);
      return res.redirect('/wall');
    }

 );

//   wisdom.push({ name: user.name, quote: user.quote });
//  console.log('wisdom array: ' + wisdom);
//   res.render('wall', { users: wisdom });

  // try {
  //   User.find({ name: user.name }, function (err, user){
  //     user.quote.push({ quote: user.quote });
  //     user.save(function (err) {
  //     });
  //   });
  //   console.log('user:' + user);
  //   wisdom.push({ name: user.name, quote: user.quote });
  //   console.log('wisdom array: ' + wisdom );
  //   res.render('wall', { users: wisdom });
  // } catch (error) {
  //   user.save(function(error) {
  //     if (error) {
  //     console.log('something went wrong');
  //       for (var key in error.errors) {
  //         req.flash('registration',error.errors[key].message);
  //       };
  //     res.redirect('/');
  //   } else {
  //     console.log('successfully added a user!');
  //       wisdom.push({ name: user.name, quote: user.quote });
  //       console.log('wisdom array: ' + wisdom);
  //       res.render('wall', { users: wisdom });
  //     };
  //   });
  // }
});

app.get('/wall', function(req, res) {
  User.find({}, function (err, users) {
    console.log(users);
    res.render('wall', { users });
  });

});

// io.sockets.on('connection', function(socket) {
//     console.log('sockets are connected dawg!');

//   socket.on('new_message', function (user) {
//     let msgInfo = {
//       user: user.name,
//       quote: user.quote,
//     };

//     console.log('message info: ' + msgInfo);
//     io.sockets.emit('add_message', msgInfo);
//   });
// });
