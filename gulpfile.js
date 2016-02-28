
var 
  gulp        = require('gulp'),
  minifycss   = require('gulp-minify-css'),
  sass        = require('gulp-sass'),
  jade        = require('gulp-jade'),
  browserSync = require('browser-sync'),
  reload      = browserSync.reload,
  autoprefixer= require('gulp-autoprefixer'),
  rename      = require('gulp-rename'),
  concat      = require('gulp-concat'),
  uglify      = require('gulp-uglify'),
  plumber			= require('gulp-plumber'),
  gutil       = require('gulp-util'),
  clean       = require('gulp-clean');
//https://github.com/FrankFang/gulp-html-extend


gulp.task('clean', function () {  
  return gulp.src('build', {read: false})
    .pipe(clean());
});


gulp.task('sass',function(){
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'))
    .pipe(reload({stream:true}));
});

gulp.task('jade', function(){
  return gulp.src("app/**/*.jade")
  	.pipe(plumber())
  	.pipe(jade())
 // 	.on('error', function(err) {
 //     console.log(err);
//		})
  	.pipe(gulp.dest('build/'))
    .pipe(reload({stream:true}));
});
gulp.task('img', function(){
  return gulp.src("app/img/**/*.*")
    .pipe(gulp.dest('build/img'))
    .pipe(reload({stream:true}));
});

gulp.task('vendor', function() {  
  return gulp.src('app/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(rename("vendor.min.js"))
    .pipe(gulp.dest('build'))
    .on('error', gutil.log)
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task ('watch', function(){
  gulp.watch('app/**/*.sass', ['sass']);
  gulp.watch('app/**/*.jade', ['jade']);
  gulp.watch('app/img/**/*.*', ['img']);
  
});


gulp.task('default', ['watch', 'browserSync','sass','jade', 'img']);