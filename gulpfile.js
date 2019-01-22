const gulp = require('gulp');
const shell = require('gulp-shell');
const watch = require('gulp-watch');

//im just witching for this files
const src = [
  './api',
  './test',
  './server.js',
];

gulp.task('test:dev', () => {
  watch(src, () => gulp.run('test'));
});

gulp.task('test', shell.task('npm test'));
