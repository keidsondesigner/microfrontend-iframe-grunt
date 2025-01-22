module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          base: 'root-app',
          livereload: true
        }
      }
    },
    watch: {
      files: ['root-app/**/*'],
      options: {
        livereload: true
      }
    }
  });

  grunt.registerTask('serve', ['connect', 'watch']);
};