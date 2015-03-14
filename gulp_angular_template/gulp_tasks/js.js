// gulp module
var gulp = require("gulp");
var config = require("./config")
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var addsrc = require("gulp-add-src")
var merge = require("event-stream").merge;

// js module
var jslint = require("gulp-jshint");
var jsminify = require("gulp-uglify");
var tslint = require("gulp-tslint");
var tsbuild = require("gulp-typescript")

// dest js concat
var concatfiles = []
concatfiles = concatfiles.concat(
    config.path.libs.js,
    config.path.src.js,
    config.path.src.buildjs
);

// task
gulp.task("build:js",function(){
    return merge(
        gulp.src(config.path.src.js)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(addsrc(config.path.src.buildjs))
        .pipe(jslint())
        .pipe(jslint.reporter()),

        gulp.src(concatfiles)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(concat(config.filename.mainjs))
        .pipe(gulp.dest(config.path.dest.js))
    )
});

gulp.task("build:ts",function(){
    return gulp.src(config.path.src.ts)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(tslint())
        .pipe(tsbuild())
        .pipe(gulp.dest(config.path.dest.ts_build))
});

gulp.task("build:headjs",function(){
    return gulp.src(config.path.src.headjs)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(jslint())
        .pipe(jslint.reporter())
        .pipe(concat(config.filename.headjs))
        .pipe(gulp.dest(config.path.dest.js))
});

gulp.task("compress:js",function(){
    return gulp.src(config.path.dest.js + "*.js")
        .pipe(jsminify())
        .pipe(gulp.dest(config.path.dest.js))
});