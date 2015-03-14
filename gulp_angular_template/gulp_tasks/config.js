var bowerdir = "./bower_components/"
var libs = {
    bower : "bower.json",
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

var devroot = "_dev/"
var approot = "_app/"
var libdir_js = devroot + "js/libs/"
var libdir_css = devroot + "css/libs/"

var src = {
    html: devroot + "html/**/*.html",
    index_html : devroot + "/index.html",
    js : devroot + "js/*.js",
    headjs : devroot + "js/head/*.js",
    buildjs : devroot + "js/build/*.js",
    ts  : devroot + "js/*.ts",
    css : devroot + "css/*.css",
    scss : devroot + "css/*.scss",
    buildcss : devroot + "css/build/*.css",
}

var dest = {
    html : approot + "views/",
    js : approot + "scripts/",
    ts_build  : devroot + "js/build/",
    css : approot + "styles/",
    scss_build : devroot + "css/build/",
}

var clean = {
    app : "_app/**/*.*",
    build : "_dev/**/build/*.*",
}

// module path
var path = {
    devroot : devroot,
    approot : approot,
    libs : libs,
    src : src,
    dest : dest,
    clean : clean,
}

// module filename
var filename = {
    mainjs : "main.js",
    headjs : "head.js",
    maincss : "styles.css",
    livereload : "http://localhost:35729/livereload.js"
}

// define module
module.exports = {
    path : path,
    filename : filename,
}