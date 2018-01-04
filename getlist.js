var request = require('request').defaults({jar: true});
const cheerio = require('cheerio');
var fs = require('fs');

var lovelive_wiki = {
    method: 'GET',
    url: "http://love-live.wikia.com/wiki/" + "Song_Centers",
    headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Takami/1.0)"
    }
};

// console.log("Takami: Running...");
request(lovelive_wiki, function (error, response, body)
{
    if (error) throw new Error(error);
    var $ = cheerio.load(body);
    var hrefs = new Array();
    var output = fs.createWriteStream("output/song_url.js");

    $('table tr a:not(.image.image-thumbnail.link-internal)').each( function()
    {   // Get most song
        let url_link = "http://love-live.wikia.com" + $(this).attr('href');
        hrefs.push( url_link );
    });

    // Get A-RISE and Sanit Snow song
    var arise = ["https://love-live.wikia.com/wiki/Private_Wars","https://love-live.wikia.com/wiki/Shocking_Party"];
    var brise = ["https://love-live.wikia.com/wiki/SELF_CONTROL!!","https://love-live.wikia.com/wiki/CRASH_MIND","https://love-live.wikia.com/wiki/DROPOUT!%3F","https://love-live.wikia.com/wiki/Awaken_the_power"];
    hrefs = hrefs.concat(arise); // A-RISE
    hrefs = hrefs.concat(brise); // Sanit Snow

    output.write( "module.exports.songlist = [" );
    hrefs.forEach(function(v)
    {
        let uuu = "'" + v + "',";
        output.write( uuu );
    });

    output.write( "];" );
    output.end();
    console.log('Takami: Got the song list.');
});