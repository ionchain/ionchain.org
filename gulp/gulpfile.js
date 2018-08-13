var gulp = require('gulp'),
	less = require('gulp-less'),
	fileinclude = require('gulp-file-include'),
	browserSync = require('browser-sync');
	replace = require('gulp-replace');

var DIST = '../dist'
var SRC = '../src'

gulp.task('fileinclude', function() {
	gulp.src([`${SRC}/*.html`])
		.pipe(fileinclude({
		// filters: {
		// 	markdown: markdown.parse
		// }
		}))
		.pipe(replace(/__baseURL#/g, 'http://img3.1nongfu.com/'))//relative '../'
		.pipe(gulp.dest(DIST));
});

gulp.task('less', function() {
	gulp.src(`${SRC}/less/*.less`)
	.pipe(less())
	.pipe(replace(/__baseIMG#/g, 'http://img3.1nongfu.com/'))
	.pipe(replace(/__UPPER_ONE#/g, 'http://img3.1nongfu.com/'))
	.pipe(gulp.dest(`${DIST}/css`));
});

gulp.task('watch', function() {
	gulp.watch(`${SRC}/less/**/*.less`, ['less']);
	gulp.watch([`${SRC}/*.html`,`${SRC}/html-includes/**/*.html`], ['fileinclude']);
	gulp.watch([`${SRC}/*.html`,`${SRC}/html-includes/**/*.html`], ['fileinclude']);
});


gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "../dist"
		},
		// proxy:"http://localhost:3000",
		port:8800,
		ui: {
			port: 8801
		}
    });
    //监听任何文件变化，实时刷新页面
    gulp.watch([`${DIST}/css`,`${DIST}/*.html`]).on('change', browserSync.reload);
});

gulp.task('default',['watch','less','fileinclude','browser-sync'], function() {
});
