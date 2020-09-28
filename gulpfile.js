const del = require('del');
const gulp = require('gulp');
const _ = require('lodash');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const $ = require('gulp-load-plugins')({lazy: true});

/**
 * Configs
 */
const root = './';
const paths = {
    js: [
        root + 'app/**/*.module.js',
        root + 'app/**/*.module.js',
        root + 'app/**/*.js'
    ],
    css: [
        root + 'app/**/*.css'
    ],
    html: [
        root + 'app/**/*.html'
    ],
    images: [
        root + 'img/**/*.*'
    ],
    button: [
        root + 'button/**/*.*'
    ],
    fonts: [
        root + 'fonts/**/*.*',
        root + 'node_modules/font-awesome/fonts/**/*.*'
    ],
    locales: [
        root + 'i18n/**/*.*'
    ],
    manifest: [
        root + 'manifest.json'
    ],
    background: [
        root + 'background.js'
    ],
    option: [
        root + 'options.js'
    ],
    options: [
        root + 'options.html'
    ],

    tmp: root + 'tmp/',
    lib: root + 'node_modules/',
    index: root + 'index.html',
    optimized: {
        app: 'app.js',
        lib: 'node_modules.js'
    },
    build: root + 'dist/'
};


/**
 * Default task
 */
gulp.task('default', ['wiredep']);


/**
 * Copy fonts
 */
gulp.task('fonts', ['clean'], function () {
    return gulp
        .src(paths.fonts)
        .pipe(gulp.dest(paths.build + 'fonts'));
});


/**
 * Copy locales
 */
gulp.task('locales', ['clean'], function () {
    return gulp
        .src(paths.locales)
        .pipe(gulp.dest(paths.build + 'i18n'));
});

/**
 * Copy manifest
 */
gulp.task('manifest', ['clean'], function () {
    return gulp
        .src(paths.manifest)
        .pipe(gulp.dest(paths.build));
});

gulp.task('background', ['clean'], function () {
    return gulp
        .src(paths.background)
        .pipe(gulp.dest(paths.build));
});

gulp.task('option', ['clean'], function () {
    return gulp
        .src(paths.option)
        .pipe(gulp.dest(paths.build));
});

gulp.task('button', ['clean'], function () {
    return gulp
        .src(paths.button)
        .pipe(gulp.dest(paths.build));
});

gulp.task('options', ['clean'], function () {
    return gulp
        .src(paths.options)
        .pipe(gulp.dest(paths.build));
});


/**
 * Copy and compress img
 */
gulp.task('images', ['clean'], function () {
    return gulp
        .src(paths.images)
        .pipe(gulp.dest(paths.build + 'img'));
});

/**
 * Copy and compress button
 */
gulp.task('button', ['clean'], function () {
    return gulp
        .src(paths.button)
        .pipe(gulp.dest(paths.build + 'button'));
});


/**
 * Create $templateCache from the html templates
 */
gulp.task('templatecache', ['clean'], function () {
    var templateCache = {
        file: 'templates.js',
        options: {
            module: 'app',
            root: 'app/',
            standAlone: false
        }
    };
    return gulp
        .src(paths.html)
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe($.angularTemplatecache(
            templateCache.file,
            templateCache.options
        ))
        .pipe(gulp.dest(paths.build + 'js'));
});


/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 */
gulp.task('optimize', ['clean', 'templatecache', 'images', 'fonts'], function () {
    return gulp
        .src(paths.index)
        // .pipe(babel())
        .pipe($.useref({searchPath: root}))
        .pipe($.if('*.js', terser()))
        .pipe($.if('*.css', cleanCSS()))
        .pipe(gulp.dest(paths.build));
});

/**
 * Create build
 */
gulp.task('build', ['optimize', 'locales', 'manifest', 'options', 'background', 'option', 'button'], function () {
    return gulp
        .src(paths.build + 'index.html')
        .pipe(inject(paths.build + 'js/templates.js', 'templates'))
        .pipe(gulp.dest(paths.build));
});


/**
 * Remove all files from the build folder
 */
gulp.task('clean', function (done) {
    var delconfig = [].concat(paths.build);
    del(delconfig, done);
});


////////////////

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, order) {
    var options = {read: false, relative: true};
    if (label) {
        options.name = 'inject:' + label;
    }

    return $.inject(orderSrc(src, order), options);
}


/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc(src, order) {
    //order = order || ['**/*'];
    return gulp
        .src(src)
        .pipe($.if(order, $.order(order)));
}
