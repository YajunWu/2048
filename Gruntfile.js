module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        cssmin: {
            // Minify libs css files.
            files: {
                src: 'src/css/2048.css',
                dest: 'dest/<%= pkg.name %>.min.css'
            }
        },
        transport: {
             options: {
                paths: ['.'],      // sea模块路径
                idleading: 'dest/',     // 生成的模块id的前缀
                alias: {
                    'support2048': 'dest/support2048.js',
                    'touch': 'dest/touch.js',
                    'showanimation2048': 'dest/showanimation2048.js'
                }
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['support2048.js', 'showanimation2048.js', 'touch.js', 'main2048.js'],
                    dest: 'dest/.build'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['dest/.build/*.js', '!dest/.build/*-debug.js'],
                dest: 'dest/main2048.js'
            }
        },
        uglify: {
            options: {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'dest/.build',
                    src: ['*.js', '!*-debug.js'],
                    dest: 'dest/'
                }]
            }
        },
        clean: {
            build: ['*/.build']
        }
    });
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['transport']);
    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('2048', ['cssmin', 'transport', 'concat', 'uglify', 'clean']);
    // grunt.registerTask('2048', ['cssmin', 'transport', 'uglify', 'clean']);

};