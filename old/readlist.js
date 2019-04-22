var basic_plugin = require("./basic_plugin.js");
var lovelive_wiki = basic_plugin.lovelive_wiki;
var request = basic_plugin.request;
var cheerio = basic_plugin.cheerio;
var fs = basic_plugin.fs;

var source_list = require('./output/song_url.js');
var songlist = source_list.songlist;
var output = fs.createWriteStream("./output/output_list.js");
var ogglist = new Array();
var collected_song = 0;

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
            var music_url = song.match(/(https:\/\/vignette.wikia.nocookie.net\/love-live\/images)\/(.*)\/(.*)\/(.*).ogg\//g);

            if (
                music_url != null &&
                music_url != undefined &&
                isNaN(music_url.length)
            )
            {
                output.write( "'" + music_url + "', \n" );
            }

            if( collected_song == songlist.length )
            {   // last
                debugger;
                output.write( "];" );
                output.end();
            }
        });
    });
}