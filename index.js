const song_source = require("./song_source");
const get_ogg_url = require("./get_ogg_url");
const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let all_list = [];
let flag = 0;

function get_list(error, response, body)
{
    if (error) { throw new Error(error); }
    // DOM
    const { document } = (new JSDOM(body)).window;
    let new_urls = [ ...document.querySelectorAll(".category-page__member a") ].map( u => u.href );
    // Action
    all_list.push( ...new_urls );
    flag += 1;
    if( flag === song_source.length ) { get_ogg_url( all_list ); }
    return;
}

function main()
{
    console.log("Starting...");
    song_source.map( url =>
    {
        request( url, (error, response, body) => get_list(error, response, body) );
    });
}

main();