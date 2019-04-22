const song_source = require("./song_source");
const request = require("request");
const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;

let all_list = [];

function get_list(error, response, body)
{
    if (error) { throw new Error(error); }
    const { document } = (new JSDOM(body)).window;
    let new_urls = [
        ...document.querySelectorAll(".category-page__member a")
    ].map( u => u.href );
    all_list.push( ...new_urls );
    console.log( all_list.length );
    return;
}

module.exports = function()
{
    song_source.map( url =>
    {
        request(
            url,
            (error, response, body) => get_list(error, response, body)
        );
        // fs.writeFile(
        //     "./output/song_url.js",
        //     text_render(body),
        //     (err) => handle_files(err)
        // );
    });
}