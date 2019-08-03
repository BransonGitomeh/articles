var express = require("express");
var exphbs = require("express-handlebars");
var compression = require("compression");
var minifyHTML = require("express-minify-html");
var morgan = require("morgan");

var app = express();

app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));

app.set("view engine", ".hbs");

app.use(
  minifyHTML({
    override: true,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  })
);

app.use(morgan("tiny"));

app.get("/index.html", function(req, res) {
  res.render("home");
});

app.get("/foo.html", function(req, res) {
  res.render("foo");
});

app.use(express.static("public"));

app.listen(3000, function(error) {
  console.log("server started at 3000");
  require("./site_generator")(app);
});
