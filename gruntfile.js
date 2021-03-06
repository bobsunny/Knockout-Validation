/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		meta: {
			banner: "/*=============================================================================\n" +
					"	Author:			Eric M. Barnard - @ericmbarnard								\n" +
					"	License:		MIT (http://opensource.org/licenses/mit-license.php)		\n" +
					"																				\n" +
					"	Description:	Validation Library for KnockoutJS							\n" +
					"===============================================================================\n*/\n"
		},
		concat: {
			options: {
				separator: ";",
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: [
					"<%= meta.banner %>",
					"src/ko.validation.start.frag",
					"src/configuration.js",
					"src/utils.js",
					"src/api.js",
					"src/rules.js",
					"src/bindingHandlers.js",
					"src/extenders.js",
					"src/localization.js",
					"src/ko.extensions.js",
					"src/ko.validation.end.frag",
				],
				dest: "dist/<%= pkg.name %>.js"
			}
		},
		uglify: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				files: {
					"dist/<%= pkg.name %>.min.js": ["<%= concat.dist.dest %>"]
				}
			}
		},
		qunit: {
			files: ["Tests/test-runner.htm"]
		},
		jshint: {
			files: ["src/**/*.js", "Tests/*.js"],
			options: grunt.file.readJSON(".jshintrc"),
		},
		watch: {
			clear: {
				files: ["src/**/*.js", "Tests/*.js"],
				tasks: ["clear", "test"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-clear");

	// Default task.
	grunt.registerTask("default", ["test", "uglify"]);
	grunt.registerTask("test", ["concat", "qunit", "jshint"]);
};
