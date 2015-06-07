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
      images: {
        expand: true,
        cwd: 'src/',
        src: 'images/**/*',
        dest: 'build/',
      },
      index: {
        src: 'src/index.html',
        dest: 'build/index.html',
      },
      styles: {
        src: 'src/style.css',
        dest: 'build/style.css',
      },
    },
    concat: {
      sources: {
        src: ['src/**/*.js'],
        dest: 'build/js/daytracker.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-connect');

  grunt.registerTask('default', ['concat:sources', 'copy:index', 'copy:images', 'copy:styles', 'connect:client']);

};
