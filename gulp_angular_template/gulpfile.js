// Global
var gulp = require("gulp");
var del = require("del");
var pkg = require("./package.json");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var webserver = require("gulp-webserver");
var concat = require("gulp-concat");
var seq = require("run-sequence")
var addsrc = require("gulp-add-src")
var merge = require("event-stream").merge
var config = require("./gulp_tasks/config")
require('require-dir')('./gulp_tasks');

// CSS
var csslint = require("gulp-csslint");
var scsslint = require("gulp-scss-lint");
var cssminify = require("gulp-minify-css");
var sass = require("gulp-sass")

// Bower Install
var bower = require("bower");
gulp.task("bower",function(){
    return bower.commands.install().on("end",function(){});
});

// Watch
gulp.task("watch", function(){
    gulp.watch("_dev/html/**/*.html",["watch_html"]);
    gulp.watch("_dev/*.html",["watch_html"]);
    gulp.watch("_dev/css/*.css",["watch_css"]);
    gulp.watch("_dev/css/*.scss",["watch_scss"]);
    gulp.watch("_dev/js/*.js",["watch_js"]);
    gulp.watch("_dev/js/head/*.js",["watch_headjs"]);
    gulp.watch("_dev/js/*.ts",["watch_ts"]);
    gulp.watch("_dev/img/**/*.*",["watch_image"]);
});

gulp.task("watch_html",function(){
    return seq("build:html");
});

gulp.task("watch_css",function(){
    return seq("build:css");
});

gulp.task("watch_scss",function(){
    return seq("build:scss","build:css");
});

gulp.task("watch_js",function(){
    return seq("build:js");
});

gulp.task("watch_headjs",function(){
    return seq("build:headjs");
});

gulp.task("watch_ts",function(){
    return seq("build:ts","build:js");
});

// サーバー起動
gulp.task("runserver",function(){
    gulp.src(config.path.approot)
        .pipe(
            webserver({
                host: "localhost",
                livereload: true
            })
        );
});

// タスク
gulp.task("default",function(){
    seq("watch","runserver")
});
gulp.task("build",function(){
    seq(["build:scss","build:ts"],["build:css","build:js","build:headjs"],"build:html")
})

gulp.task("build:run",function(){
    seq(["build:scss","build:ts"],["build:css","build:js","build:headjs"],"build:html","watch","runserver")
});

gulp.task("build:clean",function(){
    seq("clean:app","clean:build","build")
})

gulp.task("build:clean:run",function(){
    seq("clean:app","clean:build",["build:scss","build:ts"],["build:css","build:js","build:headjs"],"build:html","watch","runserver")
});


// 共有アップロードzipの書き出し
var zip = require("gulp-zip");
var uploadpath = {
    source : [
        "./**",
        "!./node_modules/**",
        "!./node_modules/",
        "!./dist/**",
        "!./dist",
        "!./bower_components/**",
        "!./bower_components",
        "!./upload"
    ],
    dist : "./upload/"
}

gulp.task("upload", ["cleandir:app","cleandir:build"], function(){
    return del(uploadpath.dist + "**",function(){
       gulp.src(uploadpath.source)
        .pipe(zip("upload.zip"))
        .pipe(gulp.dest(uploadpath.dist))
    })
});
