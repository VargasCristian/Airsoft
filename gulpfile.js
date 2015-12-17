var gulp = require("gulp"),
	jade = require("gulp-jade"),
	stylus = require("gulp-stylus"),
	plumber = require("gulp-plumber"),
	nib = require("nib")


//Rutas
var routes = {
	jade:{
		main: "./src/jade/*.jade",
		watch: "./src/jade/**/**/*.jade",
		output: "./dist/"
	},
	stylus:{
		main: "./src/stylus/main.styl",
		watch: "./src/stylus/**/**/*.styl",
		output: "./dist/css/"
	}
}

gulp.task("build:jade", function(){
	gulp.src(routes.jade.main)
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(routes.jade.output))
		.pipe(plumber())
})

gulp.task("build:styl", function(){
	gulp.src(routes.stylus.main)
		.pipe(stylus({
			use: nib(),
			"include css": true
		}))
		.pipe(gulp.dest(routes.stylus.output))
		.pipe(plumber())
})


gulp.task("watch", function(){
	gulp.watch(routes.jade.watch, ["build:jade"])
	gulp.watch(routes.stylus.watch, ["build:styl"])
})

gulp.task("default", ["build:jade", "build:styl", "watch"])