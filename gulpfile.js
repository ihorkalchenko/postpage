const gulp = require('gulp'),
      sass = require('gulp-sass'),
      size = require('gulp-size'),
      cssmin = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      imagemin = require('gulp-imagemin'),
      prefixer = require('gulp-autoprefixer'),
      rigger = require('gulp-rigger'),
      rimraf = require('rimraf'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload;

const path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        scss: 'src/scss/site.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        scss: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './dist'
};

const config = {
    server: {
        baseDir: './dist'
    },
    notify: false,
    host: 'localhost',
    port: 3030,
    logPrefix:'frontend'
};

gulp.task('html', () => {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream: true}));
});

gulp.task('js', () => {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream: true}));
});

gulp.task('scss', () => {
    gulp.src(path.src.scss)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(prefixer())
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
});

gulp.task('img', () => {
    gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', () => {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('watch', () => {
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.js, ['js']);
    gulp.watch(path.watch.scss, ['scss']);
    gulp.watch(path.watch.img, ['img']);
    gulp.watch(path.watch.fonts, ['fonts']);
});

gulp.task('webserver', () => {
    browserSync(config);
});

gulp.task('clean', (cb) => rimraf(path.clean, cb));

gulp.task('default', ['html', 'js', 'scss', 'img', 'fonts', 'webserver', 'watch']);