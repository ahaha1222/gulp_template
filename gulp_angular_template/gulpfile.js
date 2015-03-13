// path
var bowerdir = "./bower_components/"
var sources = {
    bower : "bower.json",

    libs : {
        js : [
            bowerdir + "jquery/dist/jquery.js",
            bowerdir + "bootstrap/dist/js/bootstrap.js",
            bowerdir + "angular/angular.js",

        ],
        css : [
            bowerdir + "bootstrap/dist/css/bootstrap.css",
        ],
        map :[
            bowerdir + "bootstrap/dist/css/bootstrap.css.map",
        ]
    }
}


var devdir = "_dev/"
var appdir = "_app/"
var libdir_js = devdir + "js/libs/"
var libdir_css = devdir + "css/libs/"
var path = {
    dev_css_files : devdir + "css/*.css",
    dev_img : devdir + "img/*.*",
    dev_js  : devdir + "js/*.js",
    dev_ts  : devdir + "js/*.ts",
    dev_ts_build  : devdir + "js/build/",
    builded_js : devdir + "js/build/*.js",
    dev_scss: devdir + "css/*.scss",
    dev_scss_build: devdir + "css/build/",
    builded_css : devdir + "css/build/*.css",
    dev_html: [devdir + "html/**/*.html", devdir + "/index.html"],

    app_css : appdir + "styles/",
    app_js : appdir + "scripts/",
    app_img : appdir + "images/",
    app_html : appdir + "views/",

    libs_js : libdir_js + "**/*.js",
    libs_css : libdir_css + "**/*.+(css|map)",
}

// Global
var gulp = require("gulp");
var del = require("del");
var pkg = require("./package.json");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var webserver = require("gulp-webserver");
var concat = require("gulp-concat");
var header = require("gulp-header");
var seq = require("run-sequence")
var addsrc = require("gulp-add-src")
var merge = require("event-stream").merge

// dev
var zip = require("gulp-zip");

// Bower
var bower = require("bower");

//HTML
var htmllint = require("gulp-htmlhint");
var htmlminify = require("gulp-minify-html");

// CSS
var csslint = require("gulp-csslint");
var scsslint = require("gulp-scss-lint");
var cssminify = require("gulp-minify-css");
var sass = require("gulp-sass")

// Java Script
var jslint = require("gulp-jshint");
var jsminify = require("gulp-uglify");
var tslint = require("gulp-tslint");
var tsbuild = require("gulp-typescript")

// Bower Install and Replace
gulp.task("bower",function(){
    return bower.commands.install().on("end",function(){});
});
// 監視タスク
gulp.task("watch", function(){
    gulp.watch("_dev/html/**/*.html",["watch_html"]);
    gulp.watch("_dev/*.html",["watch_html"]);
    gulp.watch("_dev/css/**/*.css",["watch_css"]);
    gulp.watch("_dev/scss/**/*.scss",["watch_scss"]);
    gulp.watch("_dev/js/**/*.js",["watch_js"]);
    gulp.watch("_dev/ts/**/*.ts",["watch_ts"]);
    gulp.watch("_dev/img/**/*.*",["watch_image"]);
});

// Watch
gulp.task("watch_html",function(){
    return seq("build_html");
});

gulp.task("watch_css",function(){
    return seq("build_css");
});

gulp.task("watch_scss",function(){
    return seq("build_scss","build_css");
});

gulp.task("watch_js",function(){
    return seq("build_js");
});
gulp.task("watch_ts",function(){
    return seq("build_ts","build_js");
});
gulp.task("watch_image",function(){
    return console.log("test")
});

// HTML
// htmllint はオプションが何かありそう
gulp.task("build_html",function(){
    return gulp.src(path.dev_html)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(htmllint())
        .pipe(htmllint.reporter())
        .pipe(htmlminify())
        .pipe(gulp.dest(path.app_html))
        .on("end",function(cb){
            return gulp.start("moveindex")
        });
});

gulp.task("moveindex",function(){
    return gulp.src(path.app_html + "index.html")
        .pipe(gulp.dest(appdir))
        .on("end",function(){
            del(path.app_html + "index.html")
        });
});

// CSS
gulp.task("build_css",function(){
    return merge(
        gulp.src(path.dev_css_files)
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(addsrc(path.builded_css))
            .pipe(csslint())
            .pipe(csslint.reporter())
            .pipe(addsrc(sources.libs.css))
            .pipe(concat("style.css"))
            .pipe(cssminify())
            .pipe(gulp.dest(path.app_css)),

        gulp.src(sources.libs.map)
            .pipe(gulp.dest(path.app_css))
    )
});

gulp.task("build_scss",function(){
    return gulp.src(path.dev_scss)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(scsslint())
        .pipe(sass())
        .pipe(gulp.dest(path.dev_scss_build))
        .on("end",function(cb){
            return gulp.start("build_css")
        });
});

// js
gulp.task("build_js",function(){
    return gulp.src(path.dev_js)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(addsrc(path.builded_js))
        .pipe(jslint())
        .pipe(jslint.reporter())
        .pipe(addsrc(sources.libs.js))
        .pipe(concat("main.js"))
        .pipe(jsminify())
        .pipe(gulp.dest(path.app_js))
});

gulp.task("build_ts",function(){
    return gulp.src(path.dev_ts)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(tslint())
        .pipe(tsbuild())
        .pipe(gulp.dest(path.dev_ts_build))
});



// コピー書式
gulp.task("test_copy", function(){
    return gulp.src("./_app/**")
        .pipe(gulp.dest("./dist"))
});

// 共有用のアップロードパス
var uploadpath = {
    source : ["./**","!./node_modules/**","!./node_modules/","!./dist/**","!./dist","!./bower_components/**","!./bower_components","!./upload"],
    dist : "./upload/"
}

gulp.task("upload", ["cleandir:app","cleandir:build"], function(){
    return del(uploadpath.dist + "**",function(){
       gulp.src(uploadpath.source)
        .pipe(zip("upload.zip"))
        .pipe(gulp.dest(uploadpath.dist))
    })
});

// サーバー起動
gulp.task("runserver",function(){
    gulp.src(appdir)
        .pipe(
            webserver({
                host: "localhost",
                livereload: true
            })
        );
});

//clean
gulp.task("cleandir:app",function(){
    return del(["_app/**/*.*"],function(){});
});

gulp.task("cleandir:build",function(){
   return del("_dev/**/build/*.*")
});

// タスク
gulp.task("default",function(){
    return seq(["watch","runserver"])
});
gulp.task("build",function(){
    return seq(["build_scss","build_ts"],["build_css","build_js","build_html"])
})

gulp.task("clean-build",function(){
    return seq(["cleandir:app","cleandir:build"],"build")
})

gulp.task("buildrun",function(){
    return seq("build",["watch","runserver"])
});

gulp.task("clean-buildrun",function(){
    return seq("clean-build",["watch","runserver"])
});
