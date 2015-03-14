// gulp module
var gulp = require("gulp");
var config = require("./config")
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var addsrc = require("gulp-add-src")

// js module
var jslint = require("gulp-jshint");
var jsminify = require("gulp-uglify");
var tslint = require("gulp-tslint");
var tsbuild = require("gulp-typescript")


// task
gulp.task("build:js",function(){
    return gulp.src(config.path.src.js)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(addsrc(config.path.src.buildjs))
        .pipe(jslint())
        .pipe(jslint.reporter())
        .pipe(addsrc(config.path.libs.js))
        .pipe(concat("main.js"))
        .pipe(jsminify())
        .pipe(gulp.dest(config.path.dest.js))
});

gulp.task("build:ts",function(){
    return gulp.src(config.path.src.ts)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(tslint())
        .pipe(tsbuild())
        .pipe(gulp.dest(config.path.dest.ts_build))
});