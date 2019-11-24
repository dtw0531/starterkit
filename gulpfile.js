var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('sass', function () {
    //1. any file named .scss gets returned
    //2. scss files are converted to css files
    //3. and sent to css files below.
    return gulp.src('./src/scss/**/*.scss')//1.
      .pipe(sass.sync().on('error', sass.logError))//2.
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
      }))
      .pipe(gulp.dest('./public/css'))//3.

      .pipe(browserSync.stream())
  });
  


//reloads browser when change occurs
gulp.task('browser-sync', () => {
  browserSync.init({
    server: './public',
    notify: false,
    open: false
  })
})


gulp.task('sass:minify', function () {
  return gulp.src('./public/css/*.css')//1.
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))//3.

    .pipe(browserSync.stream())
});


gulp.task('default', ['sass', 'browser-sync'], ()=>{
  gulp.watch('./src/scss/**/*', ['sass'])
})

gulp.task('production', ['sass:minify'])



// gulp.task('printName', () => {
//     console.log('I am Marcus.')
// })

// gulp.task('printAge', () => {
//     console.log('I am 30 years old.')
// })


// gulp.task('default', ['printName', 'printAge'])


