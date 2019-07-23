var express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
var router = express.Router();
var db = require("../models");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/", (req, res) => {
  // First, we grab the body of the html with axios
  axios.get("https://old.reddit.com/r/learnprogramming/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);
    const result ={}
    $("p.title").each( (i, element) => {
      result.title = $(element).children("a").text()
      result.link = $(element).children("a").attr("href")
      // console.log(result)

      db.Article.create(result)
      .then( dbArticle => console.log(dbArticle))
      .catch( err => console.log(err))
    })
    // Send a message to the client
    res.send("Scrape Complete");
  });
});

router.post("/", (req, res) => {
  db.Article.drop()
})

module.exports = router;
