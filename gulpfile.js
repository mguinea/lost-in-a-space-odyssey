var fs = require('fs'),
    cheerio = require('cheerio'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    unzip = require('gulp-unzip'),
    zip = require('gulp-zip'),
    gulpUtil = require('gulp-util'),
    exclude_min = ['src/lib/stats.min.js', 'src/lib/jsfxr.min.js'],
    ignore  = ['src/lib/stats.min.js'],
    config = { js: [] };


gulp.task('build', ['initbuild', 'jsmin', 'addjs', 'zip', 'unzip', 'clean', 'report']);

gulp.task('initbuild', function() {

  var stream, html, $, src, js = [];

  // delete prev files
  stream = gulp.src('build/game.zip')
        .pipe(rimraf());

  stream = gulp.src('build/g.js')
        .pipe(rimraf());

  stream = gulp.src('build/index.html')
        .pipe(rimraf());


  // get a list of all js scripts from our dev file
  html = fs.readFileSync('index.html', 'utf-8', function(e, data) {
    return data;
  });

  $ = cheerio.load(html);

  $('script').each(function() {
    src = $(this).attr('src');
    id = $(this).attr('id');
    if (exclude_min.indexOf(src) === -1 && id === undefined && ignore.indexOf(src) === -1 && src !== undefined) {
        js.push(src);
    }
  });

  config.js = js;

});

gulp.task('jsmin', ['initbuild'], function() {

  var stream = gulp.src(config.js)
    .pipe(concat('build/g.js'))
    .pipe(uglify({
      mangle: {keep_fnames: false,toplevel : true}
    }).on('error', gulpUtil.log)) // notice the error event here
    .pipe(gulp.dest('.'));

  return stream;

});

gulp.task('addjs', ['jsmin'], function() {

    var js = fs.readFileSync('build/g.js', 'utf-8', function(e, data) {
      return data;
    });

    var i, tmp, extra_js = '';

    for (i = 0; i < exclude_min.length; i += 1) {
      console.log(exclude_min[i])
      extra_js += fs.readFileSync(exclude_min[i], 'utf-8', function(e, data) {
        return data;
      });
    }
    for (i = 0; i < ignore.length; i += 1) {
      console.log(ignore[i])
      extra_js += fs.readFileSync(ignore[i], 'utf-8', function(e, data) {
        return data;
      });
    }
    console.log(extra_js.length, 'OK', exclude_min);

    var stream = gulp.src('index.html')
      .pipe(replace(/<.*?script.*?>.*?<\/.*?script.*?>/igm, ''))
      .pipe(replace(/<\/body>/igm, '<script>'+extra_js+' '+js+'</script></body>'))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('build/tmp'));

    return stream;

});

gulp.task('zip', ['addjs'], function() {
  var stream = gulp.src('build/tmp/index.html')
      .pipe(zip('build/game.zip'))
      .pipe(gulp.dest('.'));

  return stream;
});


gulp.task('unzip', ['zip'], function() {
  var stream = gulp.src('game.zip')
      .pipe(unzip())
      .pipe(gulp.dest('/build/'));

  return stream;
});


gulp.task('clean', ['unzip'], function() {
  var stream = gulp.src('build/tmp/')
        .pipe(rimraf());
  return stream;
});

gulp.task('report', ['clean'], function() {
  var stat = fs.statSync('build/game.zip'),
      limit = 1024 * 13,
      size = stat.size,
      remaining = limit - size,
      percentage = (remaining / limit) * 100;

  percentage = Math.round(percentage * 100) / 100

  console.log('\n\n-------------');
  console.log('BYTES USED: ' + stat.size);
  console.log('BYTES REMAINING: ' + remaining);
  console.log(percentage +'%');
  console.log('-------------\n\n');
});


gulp.task('encode', function()  {
  var files = fs.readdirSync('./a'),
      gifs = [],
      n, parts, base64;

  for ( n in files) {
    if (files[n].indexOf('.gif') !== -1) {
      gifs.push(files[n]);
    }
  }

  for (n = 0; n < gifs.length; n += 1) {

    fs.readFileSync('.a/'+gifs[n], function(err, data) {
     console.log(err, data);
    });
    parts = gifs[n].split('.');
    console.log(parts[0], gifs[n], base64);
  }

});
