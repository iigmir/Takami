const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function(error, response, body)
{
    if (error) { throw new Error(error); }
    const { document } = (new JSDOM(body)).window;
    let new_urls = [ ...document.querySelectorAll(".category-page__member a") ].map( u => u.href );
    // console.log(new_urls);
    // xl = xl.concat( new_urls );
    return new_urls;
}