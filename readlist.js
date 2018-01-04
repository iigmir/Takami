var request = require('request').defaults({jar: true});
var cheerio = require('cheerio');
var fs = require('fs');

var source_list = require('./output/song_url.js');
var songlist = source_list.songlist;

var output = fs.createWriteStream("output/output_list.js");
var ogglist = new Array();
var collected_song = 0;

var lovelive_wiki = {
    method: 'GET',
    url: "http://love-live.wikia.com/wiki/",
    headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Takami/1.0)"
    }
};

if( songlist == undefined )
{
    console.error("Takami: Error: List file corrupted.");
}
else
{
    console.log("Takami: Reading list file...");
    output.write( "var music_list = [" );
    songlist.forEach(function(s,i)
    {
        lovelive_wiki.url = s;
        request(lovelive_wiki, function(error, response, body)
        {
            collected_song += 1;
            var $ = cheerio.load(body);
            if (error)
            {
                throw new Error(error);
            }
            console.log("Takami: Accessing " + collected_song + "th song: " + $("title").text() );
            var song = $("span.ogg_custom").html();
            let music_url = song.match(/(https:\/\/vignette.wikia.nocookie.net\/love-live\/images)\/(.*)\/(.*)\/(.*).ogg\//g)[0];
            output.write( "'" + music_url + "', \n" );

            if( collected_song == songlist.length )
            {   // last
                output.write( "];" );
                output.end();
                console.log(' ');
                console.log('Takami: Song list created in output_list.js.');
            }
        });
    });
}