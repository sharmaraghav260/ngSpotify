var request = require('request'); // "Request" library

var client_id = '4fc10a5b67254940bad34977d1ceb5ce'; // Your client id
var client_secret = '3479481f74994186a656d45fa8710b50'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

function SpotifyReq(urlReq) {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      console.log(token);
      var options = {
        url: 'https://api.spotify.com/v1/artists/coldplay',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
        //return body;
      });
    }
  });
}
