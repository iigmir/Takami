var basic_plugin = require("./basic_plugin.js");
var request = basic_plugin.request;
var cheerio = basic_plugin.cheerio;
var fs = basic_plugin.fs;
var lovelive_wiki = basic_plugin.lovelive_wiki;

var hrefs = new Array();
var output = fs.createWriteStream("output/song_url.js");

var song_groups = [
"http://love-live.wikia.com/wiki/Category:%CE%9C%27s_Songs",
"http://love-live.wikia.com/wiki/Category:Aqours_Songs",
"http://love-live.wikia.com/wiki/Category:Duo_Trio_Songs",
"http://love-live.wikia.com/wiki/Category:Solo_Songs"];
var request_priority = 1;

function get_songs_from_categroy( recursion_times , input_array , output_array )
{
    if( recursion_times <= input_array.length )
    {
        lovelive_wiki.url = input_array[ recursion_times - 1 ];
        request(lovelive_wiki, function( error, response, body )
        {   // get_songs_from_categroy
            if (error) throw new Error(error);
            let $ = cheerio.load(body);
            let songs_list = $("#mw-pages a");
            for( var s=0 ; s<songs_list.length ; s++ )
            {
                var url_link = "http://love-live.wikia.com" + songs_list[s].attribs.href;
                output_array.push( url_link );
            }
            //console.log( output_array.length );
            return get_songs_from_categroy( recursion_times + 1 , input_array , output_array );
        });
    }
    else
    {
        let whole_songs = add_rival_songs(output_array);
        output_url( whole_songs );
        debugger;
        return;
    }
}


function add_rival_songs( input_array )
{
    var arise = ["https://love-live.wikia.com/wiki/Private_Wars","https://love-live.wikia.com/wiki/Shocking_Party"];
    var brise = ["https://love-live.wikia.com/wiki/SELF_CONTROL!!","https://love-live.wikia.com/wiki/CRASH_MIND","https://love-live.wikia.com/wiki/DROPOUT!%3F"];
    // 5 songs
    input_array = input_array.concat(arise); // A-RISE
    input_array = input_array.concat(brise); // Sanit Snow
    return input_array;
}

function output_url( input_array )
{
    output.write( "module.exports.songlist = [" );
    hrefs.forEach(function(v)
    {
        let uuu = "'" + v + "',";
        output.write( uuu );
    });
    output.write( "];" );
    output.end();
    console.log('Takami: Got the song list.');
    return;
}

get_songs_from_categroy( request_priority, song_groups, hrefs );