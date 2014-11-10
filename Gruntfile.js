module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        transport: {
             options: {
                debug: false,
                paths: ['src/js'],      // sea模块路径
                idleading: 'index/2048'     // 生成的模块id的前缀
            },
            main: {
                options: {
                    idleading: 'index/2048/'
                },
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['support2048.js', 'showanimation2048.js', 'touch.js', 'main2048.js'],
                    dest: 'dest/'
                }]
            }
        },
        concat : {
            options: {
                separator: ';'
            },
            dist : {
                src: ['dest/main2048.js', 'dest/showanimation2048.js', 'dest/support2048.js', 'dest/touch.js'],
                dest: 'dest/<%= pkg.name %>.js'
            }
        },
        uglify : {
            options: {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= concat.dist.dest %>',
                dest: 'dest/<%=pkg.name %>.min.js'
            }
        },
        cssmin: {
            files: {
                src: 'src/css/2048.css',
                dest: 'dest/<%=pkg.name %>.min.css'
            }
        },
        watch: {
            files: ['<%= transport.main.files.src %>'],
            tasks: ['concat', 'uglify']
        },
        clean: {
            js: ['dest/2048.js', 'dest/support2048.js', 'dest/showanimation2048.js', 'dest/touch.js', 'dest/main2048.js']
        }
    });
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['transport']);
    grunt.registerTask('start', ['concat', 'uglify', 'cssmin', 'clean']);
    grunt.registerTask('watch', ['watch']);

}; 