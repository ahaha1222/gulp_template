// Global
var gulp = require("gulp");
var webserver = require("gulp-webserver");
var concat = require("gulp-concat");
var seq = require("run-sequence")
var config = require("./gulp_tasks/config")
require('require-dir')('./gulp_tasks');

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

gulp.task("compress",function(){
    seq(["compress:html","compress:css","compress:js"])
});

gulp.task("build",function(){
    seq(["build:scss","build:ts"],["build:css","build:js","build:headjs"],"build:html","compress")
})

gulp.task("build:run",function(){
    seq(["build:scss","build:ts"],["build:css","build:js","build:headjs"],"build:html","compress","watch","runserver")
});

gulp.task("build:clean",function(){
    seq("clean:app","clean:build","build","compress")
})

gulp.task("build:clean:run",function(){
    seq("clean:app","clean:build",["build:scss","build:ts"],["build:css","build:js","build:headjs"],"build:html","compress","watch","runserver")
});






// 共有アップロードzipの書き出し
// Git等使わずに受け渡しする用です
var del = require("del");
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
