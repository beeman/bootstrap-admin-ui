var gulp = require('gulp'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  rimraf = require('gulp-rimraf')
watch = require('gulp-watch');

var paths = {
  sass: 'sass/**/*.scss',
};

/**
 * Watch src and execute tasks when changes are made
 */
gulp.task('watch', function() {
  gulp.watch([ paths.sass ], [ 'sass', 'livereload' ]);
});

/*
 * Serve the files out of /dist
 */
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8888
  });
});

/*
 * Reload the web server
 */
gulp.task('livereload', function() {
  gulp.src('index.html')
    .pipe(connect.reload());
});

/*
 * Cleans the distribution directory
 */
gulp.task('clean', [ 'clean-css', 'clean-dist' ]);

gulp.task('clean-dist', function() {
  return gulp.src('dist', {
      read: false
    })
    .pipe(rimraf({
      force: true
    }));
});

gulp.task('clean-css', function() {
  return gulp.src('dist/css/*', {
      read: false
    })
    .pipe(rimraf({
      force: true
    }));
});

/**
 * Compile sass
 */
gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(concat('rdash.css'))
    .pipe(gulp.dest('dist/css'));

  return gulp.src('dist/css/rdash.css')
    .pipe(minifycss())
    .pipe(rename('rdash.min.css'))
    .pipe(gulp.dest('dist/css/'))
});

/*
 * Copy assets and compile sass.
 */
gulp.task('build', [ 'sass' ]);

gulp.task('default', [ 'build', 'connect', 'livereload', 'watch' ]);