// gulp module
var gulp = require("gulp");
var config = require("./config")
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var merge = require("event-stream").merge;
var template = require("gulp-template");
// html
var htmllint = require("gulp-htmlhint");
var htmlminify = require("gulp-minify-html")

gulp.task("build:html",function(){
    return merge (
        gulp.src(config.path.src.html)
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(template(config.filename))
            .pipe(htmllint())
            .pipe(htmllint.reporter())
            .pipe(gulp.dest(config.path.dest.html)),

        gulp.src(config.path.src.index_html)
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(template(config.filename))
            .pipe(htmllint())
            .pipe(htmllint.reporter())
            .pipe(gulp.dest(config.path.approot))
    )
});

gulp.task("compress:html",function(){
    return merge(
        gulp.src(config.path.dest.html + "*.html")
            .pipe(htmlminify())
            .pipe(gulp.dest(config.path.dest.html)),

        gulp.src(config.path.approut + "*.html")
            .pipe(htmlminify())
            .pipe(gulp.dest(config.path.approot))
    )
});