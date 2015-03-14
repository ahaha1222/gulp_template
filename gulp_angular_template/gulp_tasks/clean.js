// gulp module
var gulp = require("gulp");
var del = require("del");
var config = require("./config")
var seq = require("gulp-run-sequence")

//clean
gulp.task("clean:app",function(){
    return del(config.path.clean.app);
});

gulp.task("clean:build",function(){
    return del(config.path.clean.app)
});

gulp.task("clean",function(){
    seq("clean:app","clean:build")
});