var request = require('request').defaults({jar: true});

var british_goverment = { 
    method: 'GET',
    url: "https://www.gov.uk",
    headers: {
        'Accept-Language': 'en-GB,en;q=0.5'
    }
};

var google = { 
    method: 'GET',
    url: "https://www.google.com.tw",
    qs: { num:20 , q:"web crawler" },
    headers: {
        "x-token": "my-token",
        "User-Agent": "Mozilla/5.0 (compatible; Takami/1.0)"
    }
};
var options = google;

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //console.log(response.request.headers);
    //console.log(body);
    console.log("Request success!");
});