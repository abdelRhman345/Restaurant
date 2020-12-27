var gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  notify = require("gulp-notify"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  livereload = require("gulp-livereload"),
  zip = require("gulp-zip");

// HTML Task
gulp.task('html', function () {

  return gulp.src('project/index.*')
          .pipe(pug({pretty: true}))
          .pipe(concat('index.html'))
          .pipe(gulp.dest('dist'))
          .pipe(livereload());
});

gulp.task('log-in', function () {

  return gulp.src('project/log-in.*')
          .pipe(pug({pretty: true}))
          .pipe(concat('log-in.html'))
          .pipe(gulp.dest('dist'))
          .pipe(livereload());
});

gulp.task('sign-up', function () {

  return gulp.src('project/sign-up.*')
          .pipe(pug({pretty: true}))
          .pipe(concat('sign-up.html'))
          .pipe(gulp.dest('dist'))
          .pipe(livereload());
});

// CSS Task
gulp.task("css", function () {
  return gulp
    .src("project/css/**/*.*")
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "uncompressed"
    }))
    .pipe(prefix("last 2 version"))
    .pipe(concat("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
});
// Js Task
gulp.task('script', function () {

  return gulp.src('project/js/*.*')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/Js'))
    .pipe(livereload());
});

// Img Task
gulp.task('img', function () {

  return gulp.src('project/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(livereload());
});

// Compress Task
gulp.task('compress', function () {

  return gulp.src('dist/**/*.*')
    .pipe(zip('design.zip'))
    .pipe(gulp.dest('.'))
    .pipe(notify('Files Is Compressed'))
});

// Watch Task
gulp.task('watch', function () {
  require('./server.js');
  livereload.listen();
  gulp.watch('project/index.*', gulp.series('html'));
  gulp.watch('project/log-in.*', gulp.series('log-in'));
  gulp.watch('project/sign-up.*', gulp.series('sign-up'));
  gulp.watch('project/css/**/*.*', gulp.series('css'));
  gulp.watch('project/js/*.*', gulp.series('script'));
  gulp.watch('project/images/*', gulp.series('img'));
  gulp.watch('dist/**/*.*', gulp.series('compress'));
});

// Defualt Task
gulp.task('default', gulp.series('watch'));