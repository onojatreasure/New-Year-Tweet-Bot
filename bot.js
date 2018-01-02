console.log("The follow bot is starting");
//bot for posting tweets
//Include twit package
var Twit = require('twit');

//include config file
var config = require('./config.js');

//place api keys in a variable
var T = new Twit(config);

// post a tweet with media 
var fs = require('fs');

var b64content = fs.readFileSync('./image/happ.jpg', { encoding: 'base64' });
 
// first we must post the media to Twitter 
T.post('media/upload', { media_data: b64content }, function (err, data, response) {
  // now we can assign alt text to the media, for use by screen readers and 
  // other text-based presentations and interpreters 
  
  var mediaIdStr = data.media_id_string;
  var altText = "Happy new year firework gif.";
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
 
  T.post('media/metadata/create', meta_params, function (err, data, response) {
    console.log(fs);  
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet) 
      var params = { status: 'All the good works of your hands shall prosper. Happy New Year Fams! We. Are. Conquerors. #NewYearBot', media_ids: [mediaIdStr] }
 
      T.post('statuses/update', params, function (err, data, response) {
        //console.log(data);
      });
    } else {
        console.log(err);
    }
  });
});