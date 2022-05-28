import gulp from "gulp";

// Import paths
import { path } from './gulp/config/path.js';

// Import all plugins
import { plugins } from "./gulp/config/plugins.js"

// Passing value to global variable
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins
}

// Import tasks
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';

// File change watcher
function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

const mainTasks = gulp.series(fonts, gulp.parallel(html, scss, js, images));

const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher));


// Default script execution
gulp.task('default', dev);