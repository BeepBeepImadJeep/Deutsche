import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import sourcemaps from 'gulp-sourcemaps';

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemap: app.isDev })
    // .pipe(app.plugins.plumber(
    //   app.plugins.notify.onError({
    //     title: 'SCSS',
    //     message: 'Error: <%= error.message %>'
    //   })
    // ))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    // .pipe(sass({
    //   outputStyle: 'expanded'
    // }))
    // .pipe(rename({
    //   extname: '.css'
    // }))
    // .pipe(
    //   app.plugins.if(
    //     app.isBuild,
    //     groupCssMediaQueries()
    //   )
    // )
    // .pipe(
    //   app.plugins.if(
    //     app.isDev,
    //     webpcss({
    //       webpClass: '.web',
    //       noWebpClass: '.no-web'
    //     })
    //   )
    // )
    // .pipe(
    //   app.plugins.if(
    //     app.isBuild,
    //     autoprefixer({
    //     grid: true,
    //     overrideBrowserslist: ['last 3 version'],
    //     cascade: true
    //     })
    //   )
    // )
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
    .pipe(app.gulp.dest(app.path.build.css))

    .pipe(
      app.plugins.if(
        app.isBuild,
        cleanCss()
      )
    )
    // .pipe(app.gulp.dest(app.path.build.css))
    // .pipe(app.plugins.browsersync.stream());
};
