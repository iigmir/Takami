const song_source = require("./song_source");
const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let all_list = [];

function all_list_closure( callback )
{
    return () => callback();
}

function get_list(url, song_list)
{
    request(url, (error, response, body) =>
    {
        if (error) { throw new Error(error); }
        const { document } = (new JSDOM(body)).window;
        let new_urls = [
            ...document.querySelectorAll(".category-page__member a")
        ].map( u => u.href );
        console.log(new_urls.length);
        // all_list_closure( () => all_list.concat(new_urls) );
        all_list.concat(new_urls);
        console.log(all_list.length);
        return new_urls;
    });
}

module.exports = function()
{
    let song_list = [];
    song_source.map( url => song_list = get_list(url, song_list) );
    return song_list;
}