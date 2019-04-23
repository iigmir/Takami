const request = require("request");
const jsdom = require("jsdom");
const handle_files = require("./handle_files");
const { JSDOM } = jsdom;

let all_list = [];
let song_list = [];
let flag = 0;

function get_url(error, response, body)
{
    if (error) { throw new Error(error); }
    // DOM
    const ogg_player_1 = new JSDOM(body).window.document.querySelector("div#ogg_player_1");
    let ogg_player_http = "";
    if( ogg_player_1 !== null )
    {
        ogg_player_http = ogg_player_1.innerHTML.match(/http.+(?=\/revision)/g);
        console.log( "Get song:" + ogg_player_http );
        song_list.push( ogg_player_http[0] );
    }
    // Action
    flag += 1;
    if( flag === all_list.length )
    {
        console.log(song_list);
        debugger;
        fs.writeFile(
            "./output/output_url.json",
            JSON.stringify({ song_list }),
            (err) => handle_files(err)
        );
    }
    return;
}

module.exports = function(input_url_list)
{
    all_list = input_url_list;
    input_url_list.map( url =>
    {
        let req = "https://love-live.fandom.com" + url;
        request( req, (error, response, body) => get_url(error, response, body) );
    });
}