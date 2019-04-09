module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      contents: ['dist/*'],
      subfolders: ['dist/*/'],
    },
    babel: {
        options: {
            sourceMap: false,
            presets: ['es2015']
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'js',
                src: ['script.js'],
                dest: 'dist/js',
                ext: '.js',
                extDot: 'first'
            }]
        }
    },
    sprite:{
      all: {
        src: 'sprites/*.png',
        dest: 'img/arrow.png',
        destCss: 'scss/arrow.scss'
      }
    },
    watch: {
      babel: {
        files: ['js/script.js'],
        tasks: ['babel'],
      },
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['scss/*.scss'],
        tasks: ['sass', 'cssmin'],
      },
      // livereload: {
      //   // Here we watch the files the sass task will compile to
      //   // These files are sent to the live reload server after sass compiles   to them 
      //   options: { livereload: true },  
      //   files: ['dest/**/*'],
      // },
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'css/',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['dist/css/s*.min.css'],
        dest: 'dist/css/main.min.css',
      },
    },
    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'js',
          src: '**/script.js',
          dest: 'dist/js'
        }]
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'img/',                   // Src matches are relative to this  path 
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match  
          dest: 'dist/img/'                  // Destination path prefix 
        }]
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask('default', ['clean', 'babel', 'sass', 'concat', 'cssmin', 'uglify', 'imagemin']);
};