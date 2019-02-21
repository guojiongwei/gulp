const gulp = require('gulp');
//合并文件
const concat = require('gulp-concat');
//压缩js
const uglify = require('gulp-uglify');
//重起名字
const rename = require('gulp-rename');
//压缩css文件
const minifyCss = require('gulp-minify-css');
//服务器
const connect = require('gulp-connect');
//使用scss
const scss = require('gulp-sass');
// 把css,js资源转换为gzip格式,减少资源体积
const gzip = require('gulp-gzip');
// 压缩html
const htmlmin = require('gulp-htmlmin');
// 压缩图片
const imageMin = require('gulp-imagemin')
// css3自动加前缀
const autoprefixer = require('gulp-autoprefixer');
const ts = require('gulp-typescript')
// es6转es5
const babel = require("gulp-babel");
// 压缩html配置
const options = {
  collapseWhitespace:true,
  collapseBooleanAttributes:true,
  removeComments:true,
  removeEmptyAttributes:true,
  removeScriptTypeAttributes:true,
  removeStyleLinkTypeAttributes:true,
  minifyJS:true,
  minifyCSS:true   
};
//复制index.html文件到发布的目录dist
gulp.task('copy-index', () => {
  gulp.src('./src/index.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})
//复制pages下面的html文件到发布的目录dist
gulp.task('copy-pages', () => {
  gulp.src('./src/pages/**/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/pages'))
    .pipe(connect.reload())
})
// 复制压缩图片到dist目录
gulp.task('copy-images', () => {
  gulp.src('./src/images/**/*')
  .pipe(imageMin({progressive: true}))
  .pipe(gulp.dest('dist/images'))
})

// 复制压缩scss到dist目录
gulp.task('copy-scss', () => {
  gulp.src('./src/scss/**/*.scss')
    .pipe(scss())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(gzip())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
// 解析复制压缩ts到dist目录
gulp.task('copy-ts', () => {
  gulp.src('./src/ts/**/*.ts')
  .pipe(ts())
  .pipe(uglify())
  // .pipe(babel())
  .pipe(gulp.dest('dist/js'))
  .pipe(gzip())
  .pipe(gulp.dest('dist/js')) 
  .pipe(connect.reload())
})
// 复制插件js和css到dist目录
gulp.task('copy-lib', () => {
  gulp.src('./src/lib/**/*')
  .pipe(gulp.dest('dist/lib'))
  .pipe(gzip())
  .pipe(gulp.dest('dist/lib'))
  .pipe(connect.reload())
})
gulp.task('watch', () => {
  gulp.watch('./src/index.html', ['copy-index']);
  gulp.watch('./src/pages/**/*.html', ['copy-pages']);
  gulp.watch('./src/scss/**/*.scss',['copy-scss']);
  gulp.watch('./src/images/**/*',['copy-images']);
  gulp.watch('./src/ts/**/*.ts',['copy-ts']);
  gulp.watch('./src/lib/**/*',['copy-lib']);
})
gulp.task('build', ['copy-index','copy-pages','copy-scss','copy-ts','copy-lib', 'copy-images'], () => {
  console.log('gulp执行成功')
})
gulp.task('server', () => {
  connect.server({
    root: 'dist', //表示你服务器开启，访问dist'文件夹下的文件
    livereload:true,
    port:8081,
    host: '172.16.0.123'
  })
})
gulp.task('default', [ 'build','server', 'watch'])