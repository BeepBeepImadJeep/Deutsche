import webpack from 'webpack-stream';
import minify from 'gulp-minify';

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(minify({
      ext:{
          src: '-debug.js',
          min:'.js'
      },
      ignoreFiles: ['lib-datepicker.js']
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>'
      }))
    )
    .pipe(webpack({
      mode: app.isBuild ? 'production' : 'development',
      output: {
        filename: 'app.min.js',
      }
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};