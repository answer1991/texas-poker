/*global module:false*/
module.exports = function (grunt) {

    var publicJsFiles = ['app/modules/**/*.js'];
    var tplFiles = ['app/modules/**/*.html'];
    var lessFiles = ['app/modules/**/*.less'];


    // These plugins provide necessary tasks.
    // Load NPM tasks
    require('load-grunt-tasks')(grunt);


    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        publicPath: 'app',
        publicDistPath: 'dist',

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author?pkg.author.name:"" %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        jshint: {
            public: {
                src: publicJsFiles,
                options: {
                    jshintrc: true
                }
            }
        },
        watch: {
            js: {
                files: publicJsFiles,
                options: {
                    livereload: true
                },
                tasks: ['jshint']
            },
            tpls: {
                files: tplFiles,
                options: {
                    livereload: true
                },
                tasks: ['html2js']
            },
            less: {
                files: lessFiles,
                options: {
                    livereload: true
                },
                tasks: ['less']
            }
        },
        concurrent: {
            dev: {
                tasks: ['connect:livereload', 'watch'],
                options: {
                    logConcurrentOutput: true,
                    limit: 10
                }
            },
            prod: {
                tasks: ['nodemon:prod'],
                options: {
                    logConcurrentOutput: true,
                    limit: 10
                }
            }
        },
        shell: { //好逆天的组件..
            mkLogDir: {
                command: 'mkdir -p logs'
            },
            removeZip: {
                command: 'rm -vf <%= pkg.name %>.zip'
            },
            printTimestamp: {
                command: 'date \'+%F %H:%M:%S %z GmtSecond=%s\' > ./dist/pkgtime'
            }
        },
        // compress files into zip
        compress: {
            main: {
                options: {
                    archive: '<%= pkg.name %>.zip',
                    mode: 'zip',
                },
                expand: true,
                cwd: '.',
                src: ['dist'],
                dest: '<%= pkg.name %>'
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    '<%= publicPath %>/styles/main.css': '<%= publicPath %>/modules/**/*.less'
                }
            }
        },
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        json_merge: {
            options: {
                replacer: null,
                space: " "
            },
            i18n: {
                files: {
                    '<%= publicPath %>/lang/lang.zh_CN.json': ['<%= publicPath %>/modules/**/*.lang.zh_CN.json'],
                    '<%= publicPath %>/lang/lang.en_US.json': ['<%= publicPath %>/modules/**/*.lang.en_US.json']
                }
            }
        },

        //json convert to js
        json: {
            zh_CN: {
                options: {
                    namespace: 'window.texas-poker'
                },

                src: '<%= publicPath %>/lang/lang.zh_CN.json',
                dest: '<%= publicPath %>/lang/lang.zh_CN.js'
            },
            en_US: {
                options: {
                    namespace: 'window.texas-poker'
                },

                src: '<%= publicPath %>/lang/lang.en_US.json',
                dest: '<%= publicPath %>/lang/lang.en_US.js'
            }
        },

        html2js: {
            options: {
                base: '<%= publicPath %>',
                module: 'texas.poker.tpls',
                fileHeaderString: '/* jshint ignore:start */ ',
                fileFooterString: '/* jshint ignore:end */ '
            },
            modules: {
                src: ['<%= publicPath %>/modules/**/*.html'],
                dest: '<%= publicPath %>/modules/tpls/templates.js'
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: ['*.js', '!oldieshim.js'],
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= publicPath %>/*.html'],
                ignorePath: /\.\.\//
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= publicDistPath %>/scripts/{,*/}*.js',
                    '<%= publicDistPath %>/styles/{,*/}*.css',
                    '<%= publicDistPath %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= publicDistPath %>/styles/fonts/*'
                ]
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= publicDistPath %>/{,*/}*',
                        '!<%= publicDistPath %>/.git{,*/}*'
                    ]
                }]
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= publicPath %>/index.html',
            options: {
                dest: '<%= publicDistPath %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        }
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= publicDistPath %>/{,*/}*.html'],
            css: ['<%= publicDistPath %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= publicDistPath %>', '<%= publicDistPath %>/images']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= publicPath %>',
                    dest: '<%= publicDistPath %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'images/{,*/}*.{webp}',
                        'fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= publicDistPath %>/images',
                    src: ['generated/*']
                },
                    // {
                    //     expand: true,
                    //     cwd: '.tmp/concat/scripts',
                    //     dest: '<%= publicDistPath %>/scripts',
                    //     src: ['{,*/}*.js']
                    // },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: 'fonts/*',
                        dest: '<%= publicDistPath %>'
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= publicPath %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        connect: {
            livereload: {
                options: {
                    port: 8888,
                    hostname: '0.0.0.0',
                    livereload: 35729,
                    base: ['.', 'app']
                }
            },
            dist: {
                options: {
                    port: 8888,
                    hostname: '0.0.0.0',
                    keepalive: true,
                    base: ['dist']
                }
            }
        }
    });
    // Default task.
    grunt.registerTask('public-test', [
        'clean:dist',
        'less',
        //'json_merge:i18n',
        //'json',
        'html2js',
        'jshint:public',
        'wiredep',
        'autoprefixer'
    ]);

    // Default task.
    grunt.registerTask('public-prod', [
        'clean:dist',
        'less',
        //'json_merge:i18n',
        //'json',
        'html2js',
        'jshint:public',
        'wiredep',
        'useminPrepare',
        'copy:styles',
        'autoprefixer',
        'concat',
        'ngAnnotate:dist',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);

    // local task.
    grunt.registerTask('local', ['public-test', 'connect:livereload', 'watch']);

    // dist task
    grunt.registerTask('dist', ['public-prod', 'connect:dist']);

    // Default task.
    grunt.registerTask('build', ['public-prod', 'shell:removeZip', 'shell:printTimestamp', 'compress']);

    //console.log(grunt.config());
};
