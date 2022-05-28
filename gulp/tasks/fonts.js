import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  // Search font files .otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "FONTS",
      message: "Error: <%= error.message %>",
    })))
    // Convert to .ttf
    .pipe(fonter({ formats: ["ttf"] }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
};

export const ttfToWoff = () => {
  // Search font files .ttf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "FONTS",
      message: "Error: <%= error.message %>",
    })))
    // Convert to .ttf
    .pipe(fonter({ formats: ["woff"] }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // Search font files .ttf
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // Convert to .woff2
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
};

export const fontsStyle = () => {
  // Style file connecting fonts
  let fontsFile = `${app.path.srcFolder}/scss/base/_fonts.scss`;
  // If the file does not exist, create it.
  fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
    if (fontsFiles) {
      // Checking is there a file in the style for connecting fonts?
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Write the connecting of the font in the style file
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        // If the file exists, we display a message.
        console.log("File scss/base/_fonts.scss already exists. To update a file, you need to delete it.")
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() { }
}