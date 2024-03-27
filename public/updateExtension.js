const fs = require('fs');

// Read the list of JavaScript files in the static/js directory
fs.readdir("./static/js/", (err, jsFiles) => {
  if (err) {
    console.error("Error reading JavaScript files:", err);
    return;
  }

  // Read the list of CSS files in the static/css directory
  fs.readdir("./static/css/", (err, cssFiles) => {
    if (err) {
      console.error("Error reading CSS files:", err);
      return;
    }

    const backgroundScriptPath = './background'; 
    let backgroundScript = fs.readFileSync(backgroundScriptPath, 'utf8');

    // Replace placeholders in the background script with actual file names
    backgroundScript = backgroundScript.replace(
      /(["'])\.\/static\/js\/main\.[a-f0-9]+\.js(["'])/g,
      (match, p1, p2) => `${p1}./static/js/${jsFiles[0]}${p2}`
    );
    backgroundScript = backgroundScript.replace(
      /(["'])\.\/static\/css\/main\.[a-f0-9]+\.css(["'])/g,
      (match, p1, p2) => `${p1}./static/css/${cssFiles[0]}${p2}`
    );

    // Write the modified background script back to the file
    fs.writeFileSync(backgroundScriptPath, backgroundScript);
  });
});
