import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browsersync from "browser-sync";
import newer from "gulp-newer";
import ifPlugins from "gulp-if";  
import replace from "gulp-replace";
import nunjucks from "gulp-nunjucks";

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  nunjucks: nunjucks,
  newer: newer,
  if: ifPlugins
};