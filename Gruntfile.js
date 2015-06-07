// vim: set sts=2 ts=2 et sw=2 tw=80:
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build/**/*'],
    connect: {
      dev: {
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
    concurrent: {
      dev: ['connect:dev', 'watch'],
      options: {
        logConcurrentOutput: true,
      },
    },
    watch: {
      html: {
        files: '<%= copy.index.src %>',
        tasks: ['copy:index'],
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['rebuild'],
      },
      image: {
        files: '<%= copy.images.src %>',
        tasks: ['copy:images'],
      },
      js: {
        files: '<%= concat.sources.src %>',
        tasks: ['concat:sources'],
      },
      styles: {
        files: '<%= copy.styles.src %>',
        tasks: ['copy:styles'],
      },
      invalidate: {
        files: 'src/**/*',
        tasks: ['rebuild'],
        options: {
          event: ['deleted'],
        },
      }
    },
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', [ 'concat:sources'
                              , 'copy:index'
                              , 'copy:images'
                              , 'copy:styles'
                              ]);
  grunt.registerTask('rebuild', [ 'clean', 'build' ]);
  grunt.registerTask('default', [ 'rebuild', 'concurrent:dev' ]);
};
