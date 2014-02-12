/*
 * grunt-velocity-debug
 *
 *
 * Copyright (c) 2014 Shahar Talmi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.registerMultiTask('velocityDebug', 'The best Grunt plugin ever.', function () {
    var options = this.options({});

    this.files.forEach(function (file) {
      // Concat specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join();

      grunt.file.expand({cwd: options.debug}, '**/*.js').forEach(function (filepath) {
        src = src.replace('"' + filepath + '"', '"#if(${debug})' + (options.prefix || options.debug) + '/#{end}' + filepath + '"');
      });

      grunt.file.write(file.dest, src);

      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
