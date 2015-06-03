module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      client: {
        port: 8000,
        base: 'build/',
      },
    },
    copy: {
      index: {
        src: 'src/index.html',
        dest: 'build/index.html',
      },
    },
    concat: {
      sources: {
        expand: true,
        src: ['src/**/*.js'],
        dest: 'build/main.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-connect');

  grunt.registerTask('default', ['concat:sources', 'copy:index', 'connect:client']);

};
