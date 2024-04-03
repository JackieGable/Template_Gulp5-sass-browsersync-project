
// Bring in required dependencies
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Explicitly specify 'sass' as the compiler
const browserSync = require('browser-sync').create();



// Compile SCSS into CSS
function style() {
    // Location of SCSS files
    return gulp.src('./scss/**/*.scss')
        // Pass SCSS through Sass compiler
        .pipe(sass().on('error', sass.logError)) // Handle errors gracefully
        // Location to save compiled CSS
        .pipe(gulp.dest('./css'))
        // Stream changes to all browsers
        .pipe(browserSync.stream());
}

// Watch for changes in SCSS files
function watch() {
    // Initialize BrowserSync
    browserSync.init({
        server: {
            baseDir: './' // Serve files from the root directory
        }
    });
    // Watch SCSS files and trigger 'style' task when changes occur
    gulp.watch('./scss/**/*.scss', style);
    // Reload the browser when HTML or JS files change
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

// Export 'style' and 'watch' tasks for use in Gulp
exports.style = style;
exports.watch = watch;
