module.exports = function(grunt){
    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        apidoc: {
            myTest: {
                src: 'routes/',
                dest: 'public/doc/',
                options: {
                    debug: false
                }
            }
        }
    });

    // 插件加载，对应 package.json 中的 grunt 插件
    grunt.loadNpmTasks('grunt-apidoc');

    // 执行任务 生成api文档
    // 自定义任务： 通过定义 default 任务可以让 grunt 默认执行一个或多个任务
    grunt.registerTask('default', ['apidoc']);
    // grunt.registerTask('doc', ['apidoc']);
}