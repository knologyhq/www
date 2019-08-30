var gulp = require("gulp");
var sass = require("gulp-sass");
var serve = require("gulp-serve");
var shell = require("gulp-shell");
var clean = require("gulp-clean");
var gravatar = require("gravatar");
var request = require("request");
var fs = require("fs");
var concat = require("gulp-concat");
var config = require("dotenv").config();

/*
  what goes where?
*/
var buildSrc = "src";
var buildDest = "dist";

/*
  cleanup the build output
*/
gulp.task("clean-build", function() {
  return gulp.src(buildDest, { read: false }).pipe(clean());
});

/*
  local webserver for development
*/
gulp.task(
  "serve",
  serve({
    root: [buildDest],
    port: 8008
  })
);

/*
  simplest possible noddy js management
*/
gulp.task("js", function() {
  return gulp
    .src(buildSrc + "/js/**/*.js")
    .pipe(concat("jamstack-comments.js"))
    .pipe(gulp.dest(buildDest + "/js"));
});

/*
  Check if we need to help the developer setup the Netlify environment variables
*/
gulp.task("check-init", function(done) {
  // Look for the environment variables
  if (
    process.env.APPROVED_COMMENTS_FORM_ID &&
    process.env.API_AUTH &&
    process.env.SLACK_WEBHOOK_URL &&
    process.env.URL
  ) {
    // Automatically detect and set the comments queue form environment variable.
    var siteDomain = process.env.URL.split("://")[1];
    var url = `https://api.netlify.com/api/v1/sites/${siteDomain}/forms/?access_token=${process.env.API_AUTH}`;

    // REFACTOR: do this conditionally.. not for every build after envs are init'd
    request(url, function(err, response, body) {
      if (!err && response.statusCode === 200) {
        var body = JSON.parse(body);
        var approvedForm = body.filter(function(f) {
          return f.name == "approved-comments";
        });
        var initStatus = {
          environment: true,
          // approved_form_id: approvedForm[0].id,
          rootURL: process.env.URL,
          siteName: siteDomain.replace(".netlify.com", "")
        };
        saveInitStatus(initStatus);
        done();
      } else {
        console.log("Couldn't detect a APPROVED_FORM from the API");
        done();
      }
    });
  } else {
    var initStatus = { environment: false };
    saveInitStatus(initStatus);
    done();
  }
});

/*
  save the status of our environment somewhere that our SSG can access it
*/
function saveInitStatus(initStatus) {
  fs.writeFile(
    buildSrc + "/site/_data/init.json",
    JSON.stringify(initStatus),
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
}

/*
  Collect and stash comments for the build
*/

/*
  Watch src folder for changes
*/
gulp.task("watch", function() {
  gulp.watch(buildSrc + "/**/*", gulp.parallel("build:local"));
});

/*
  Let's build this sucker for production
*/

gulp.task("build", gulp.series("check-init", "js"));

/*
  Let's build this for local development
*/
// gulp.task("build:local", gulp.series("generate", "scss", "js"));
