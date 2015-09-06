var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    maps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssmin');


gulp.task("concatScripts", function() {
    return gulp.src([
    	'assets/javascripts/jquery-1.11.3.min.js',
        'assets/javascripts/bootstrap.min.js',
        'assets/javascripts/jquery.mCustomScrollbar.concat.min.js',
        'assets/javascripts/validator.min.js',
        'assets/javascripts/main.js'
    ])
        .pipe(maps.init())
        .pipe(concat("full.js"))
        .pipe(maps.write('./'))
        .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function (){
   return gulp.src('js/full.js')
       .pipe(uglify())
       .pipe(rename('full.min.js'))
       .pipe(gulp.dest("js"));
});

gulp.task("concatScriptsIE9", function() {
    return gulp.src([
    	'assets/javascripts/jquery.html5-placeholder-shim.js',
        'assets/javascripts/h5f.min.js'
    ])
        .pipe(maps.init())
        .pipe(concat("ie9.js"))
        .pipe(maps.write('./'))
        .pipe(gulp.dest("js"));
});

gulp.task("minifyScriptsIE9", ["concatScriptsIE9"], function (){
   return gulp.src('js/ie9.js')
       .pipe(uglify())
       .pipe(rename('ie9.min.js'))
       .pipe(gulp.dest("js"));
});

gulp.task("concatScriptsIE", function() {
    return gulp.src([
    	'assets/javascripts/html5shiv.js',
        'assets/javascripts/respond.src.js'
    ])
        .pipe(maps.init())
        .pipe(concat("ie.js"))
        .pipe(maps.write('./'))
        .pipe(gulp.dest("js"));
});

gulp.task("minifyScriptsIE", ["concatScriptsIE"], function (){
   return gulp.src('js/ie.js')
       .pipe(uglify())
       .pipe(rename('ie.min.js'))
       .pipe(gulp.dest("js"));
});

// gulp.task("minifyStyles", function (){
//     return gulp.src('stylesheets/screen.css')
//         .pipe(cssmin())
//         .pipe(rename('full.min.css'))
//         .pipe(gulp.dest("stylesheets"));
// });

gulp.task('default', ['minifyScripts', 'minifyScriptsIE9', 'minifyScriptsIE']);