
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , cors = require('cors')
  , async = require('async')
  , redis = require('redis');

if (process.env.REDIS_URL) {
    var redisURL = require('url').parse(process.env.REDIS_URL);
    var client = redis.createClient(redisURL.port, redisURL.hostname);
    client.auth(redisURL.auth.split(":")[1]);
} else {
    var client = redis.createClient();
}
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(cors());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    res.end("get outta here");
});

app.get('/api/statuses', function (req, res) {
    client.keys("aerobot:status:*", function (err, reply) {
        async.reduce(reply, {}, function(memo, item, callback) {
            client.hgetall(item, function(err, reply) {
                memo[item] = reply;
                callback(null, memo);
            });
        }, function(err, result){
            res.json(result);
        });
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
