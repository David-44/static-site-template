
const {src, dest, watch, parallel, series} = require("gulp");
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('node-sass'));
const gzip = require('gulp-gzip');
const concat = require('gulp-concat');

const prodPath = 'dist';
const devPath = 'dev';






/************************** SENDING FOR PRODUCTION ****************************/

/* All functions used to modify and copy files from dev to production environment */



// Cleaning the public production folder, needs to be done before copying anything
function cleanPublic(cb){
  del.sync(prodPath);
  cb();
}



// Copying media assets
function copyAssets(cb) {
  src(devPath + '/assets/**/*')
    .pipe(dest(prodPath + '/assets'));
  cb();
}



// Minifying HTML and copying files to the /html folder
function minifyHTML(cb) {
  src(devPath + '/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }))
    .pipe(dest(prodPath));
  cb();
}



// Minifying CSS
function minifyCSS(cb){
  src(devPath + '/main.css')
    .pipe(cleanCSS())
    .pipe(dest(prodPath));
  cb();
}



// Minifying JS
function minifyJS(cb){
  src(devPath + '/scripts.js', {allowEmpty: true})
    .pipe(uglify({}))
    .pipe(dest(prodPath));
  cb();
}





/*************************** COMPILING DEV FILES ******************************/

/* Functions used to compile from templates static files in the dv environment */

// Building HTML files from EJS
function generateHTML(cb) {
  src(devPath + '/templates/pages/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(dest(devPath + '/'));
  cb();
}



// Building CSS from sass
function generateCSS(cb) {
  src(devPath + '/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(devPath + '/'));
  cb();
}



// concatenating JS files
function concatScript(cb) {
  src(devPath + '/scripts/*.js')
    .pipe(concat('scripts.js'))
    .pipe(dest(devPath + '/'));
  cb();
}





/********************** WATCH FOR CHANGE ON DEV FILES *************************/

// Basic function for static site made out of a template
// Watch for both scss and html
function watchDev(cb) {
  watch(devPath + '/templates/**/*', generateHTML);
  watch(devPath + '/scss/**/*', generateCSS);
  watch(devPath + '/scripts/*', concatScript);
}

function watchSass(cb) {
  watch(devPath + 'scss/**/*', generateCSS);
}



/*************************** EXPORTING INTERFACES *****************************/

/* PRODUCTION INTERFACE */

// Replacing all the production files at once
exports.deploy = series(cleanPublic, copyAssets, minifyHTML, minifyCSS, minifyJS);

// Cleaning the production folder
exports.clean = cleanPublic;



/* DEV INTERFACE */

// Watching for change on dev files
exports.watchDev = watchDev;

// Watching for change on sass files
exports.sass = watchSass;
