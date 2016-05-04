'use strict';

var gulp = require('gulp');
var del = require('del');



// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var source = require('vinyl-source-stream'),
    sourceFolder = './app/scripts',
    sourceFile = './app/scripts/app.js',
    tmpFolder = './tmp/scripts',
    tmpFileName = 'app.js',
    destFolder = './dist/scripts',
    destFileName = 'app.js';

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var production = $.util.env.prod;

// Clean
gulp.task('clean', function(cb) {
    production=$.util.env.prod;
    $.cache.clearAll();
    if(!production){
        cb(del.sync(['dist/**','tmp/scripts/**']));   
    }else{
        cb(del.sync(['dist/styles', 'dist/scripts', 'dist/images','tmp/**']));    
    }
    
});

// Move JS Files and Libraries
gulp.task('moveLibraries',['clean'], function(){
  production=$.util.env.prod;  
  console.log(production?destFolder:tmpFolder);
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['./app/scripts/**/*.js'], { base: './app/scripts/' })
  .pipe(gulp.dest(production?destFolder:tmpFolder));
});


//jshint
gulp.task('eslint', function() {
  return gulp.src([sourceFolder])
  .pipe($.eslint('.eslintrc.json'))
  .pipe($.eslint.format());
});

// Styles
gulp.task('styles', ['sass', 'moveCss']);

gulp.task('moveCss',['clean'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  production=$.util.env.prod;
  gulp.src(['./app/styles/**/*.css'], { base: './app/styles/' })
  .pipe(gulp.dest(production?'./dist/styles':'./tmp/styles'));
});

gulp.task('sass', function() {
    production=$.util.env.prod;
    return $.rubySass('./app/styles', {
            style: 'expanded',
            precision: 10,
            loadPath: ['app/bower_components']
        })
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(production?'dist/styles':'tmp/styles'))
        .pipe($.size());
});








// HTML
gulp.task('html', function() {
    production=$.util.env.prod;
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest(production?'dist':'tmp'))
        .pipe($.size());
});

// Images
gulp.task('images', function() {
    production=$.util.env.prod;
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(production?'dist/images':'tmp/images'))
        .pipe($.size());
});

// Fonts
gulp.task('fonts', function() {
    production=$.util.env.prod;
    return gulp.src(require('main-bower-files')({
            filter: '**/*.{eot,svg,ttf,woff,woff2}'
        }).concat('app/fonts/**/*'))
        .pipe(gulp.dest(production?'dist/fonts':'tmp/fonts'));
    
});

// Bower helper
gulp.task('bower', function() {
    production=$.util.env.prod;
    gulp.src('app/bower_components/**/*.js', {
            base: 'app/bower_components'
        })
        .pipe(gulp.dest(production?'dist/bower_components':'tmp/bower_components'));

});

gulp.task('json', function() {
    production=$.util.env.prod;
    gulp.src('app/scripts/json/**/*.json', {
            base: 'app/scripts'
        })
        .pipe(gulp.dest(production?'dist/scripts':'tmp/scripts'));
});

// Robots.txt and favicon.ico
gulp.task('extras', function() {
    production=$.util.env.prod;
    return gulp.src(['app/*.txt', 'app/*.ico'])
        .pipe(gulp.dest(production?'dist':'tmp'))
        .pipe($.size());
});

var bundler = watchify(browserify({
    entries: [sourceFile],
    extensions : [ ".js", ".jsx" ],
    debug: true,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));

bundler.on('update', rebundle);
bundler.on('log', $.util.log);

function rebundle() {
    return bundler.bundle()
        // log errors if they happen
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source(destFileName))
        .pipe(gulp.dest(destFolder))
        .on('end', function() {
            reload();
        });
}

// Scripts
gulp.task('scripts', rebundle);

gulp.task('buildScripts', function() {
    production=$.util.env.prod;
    return browserify(sourceFile)
        .bundle()
        .pipe(source(tmpFileName))
        .pipe(gulp.dest('tmp/scripts'));
});

// Bundle
gulp.task('bundle', ['styles', 'buildScripts'], function() {
    production=$.util.env.prod;
    return gulp.src('./app/*.html')
        .pipe($.useref.assets())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('tmp'));
});

gulp.task('buildBundle', ['styles', 'scripts'], function() {
    production=$.util.env.prod;
    return gulp.src('./app/*.html')
        .pipe($.useref.assets())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

// Build
gulp.task('build', ['clean','html', 'buildBundle', 'images', 'fonts', 'extras'], function() {
    gulp.src('dist/scripts/app.js')
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest('dist/scripts'));
});

// Watch production
gulp.task('watch', ['clean','html','images', 'fonts','extras','eslint', 'bundle'], function() {
    console.log('production',production);
    
    browserSync({
        notify: false,
        logPrefix: 'browser-sync:',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: production?['dist']:['tmp']
    });

    // Watch .json files
    gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    gulp.watch(['app/styles/**/*.scss', 'app/styles/**/*.css'], ['styles', production?'scripts':'buildScripts', reload]);

    

    // Watch image files
    gulp.watch('app/images/**/*', reload);
});

// Default task
gulp.task('default', ['clean', 'build'  ]);
