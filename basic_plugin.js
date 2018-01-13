// module.exports
module.exports.request = require('request').defaults({jar: true});
module.exports.cheerio = require('cheerio');
module.exports.fs = require('fs');
module.exports.lovelive_wiki = {
    method: 'GET',
    url: "http://love-live.wikia.com/wiki/" + "Song_Centers",
    headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Takami/1.0)"
    }
};
