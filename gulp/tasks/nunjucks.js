import nunjucks from "gulp-nunjucks";

export const njk = () => {
	return app.gulp.src('src/*.html')
		.pipe(nunjucks.compile())
		.pipe(app.gulp.dest('dist'))
};
