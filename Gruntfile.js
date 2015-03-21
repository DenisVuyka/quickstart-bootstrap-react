module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      fonts: {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts/',
        src: '**',
        dest: 'www/fonts/',
        flattern: true,
        filter: 'isFile'
      }
    },

    watch: {
      all: {
        files: ['react_components/**/*.js*'],
        tasks: ['build-debug'],
        options: {
          livereload: true
        }
      }
    },

    browserify: {
      options: {
        transform: ['reactify']
      },
      dist: {
        src: 'react_components/App.jsx',
        dest: 'www/js/app.js'
      }
    },

    concat: {
      options: {
        stripBanners: true,
        sourceMap: true
      },
      css: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/font-awesome/css/font-awesome.css'
        ],
        dest: 'www/css/app.shared.css'
      },
      js: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js'
        ],
        dest: 'www/js/app.shared.js'
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      },
      target: {
        files: {
          'www/css/app.shared.min.css': [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/font-awesome/css/font-awesome.css'
          ]
        }
      }
    },

    uglify: {
      options: {
        mangle: true,
        sourceMap: true,
        sourceMapIncludeSources: false
      },
      app: {
        files: {
          'www/js/app.shared.min.js': 'www/js/app.shared.js',
          'www/js/app.min.js': 'www/js/app.js'
        }
      }
    },

    express: {
      all: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost',
          bases: ['www'],
          livereload: true
        }
      }
    },

    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'copy',
    'browserify',
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('build-debug', [
    'browserify'
  ]);

  grunt.registerTask('serve', [
    'express',
    'open',
    'watch'
  ]);
};
