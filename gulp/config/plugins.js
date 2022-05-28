import replace from "gulp-replace"; // Search and Change
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browsersync from "browser-sync"; // Local server
import newer from "gulp-newer"; // Check updates

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer
}