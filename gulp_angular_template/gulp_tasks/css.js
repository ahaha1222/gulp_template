// gulp module
var gulp = require("gulp");
var config = require("./config")
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var addsrc = require("gulp-add-src");
var merge = require("event-stream").merge;

// CSS
var csslint = require("gulp-csslint");
var scsslint = require("gulp-scss-lint");
var cssminify = require("gulp-minify-css");
var sass = require("gulp-sass")

// CSS
gulp.task("build:css",function(){
    return merge(
        gulp.src(config.path.src.css)
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(addsrc(config.path.src.buildcss))
            .pipe(csslint())
            .pipe(csslint.reporter())
            .pipe(addsrc(config.path.libs.css))
            .pipe(concat(config.filename.maincss))
            .pipe(gulp.dest(config.path.dest.css)),

        gulp.src(config.path.libs.map)
            .pipe(gulp.dest(config.path.dest.css))
    )
});

gulp.task("build:scss",function(){
    return gulp.src(config.path.src.scss)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(scsslint())
        .pipe(sass())
        .pipe(gulp.dest(config.path.dest.scss_build))
});

gulp.task("compress:css",function(){
    return gulp.src(config.path.dest.css + "*.css")
        .pipe(cssminify())
        .pipe(gulp.dest(config.path.dest.css))
})