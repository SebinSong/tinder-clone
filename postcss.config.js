const Autoprefixer = require('autoprefixer');
const FlexBugsFixes = require('postcss-flexbugs-fixes');

module.exports = {
  map: true,
  plugins: [
    FlexBugsFixes(),
    Autoprefixer({
      flexbox: 'no-2009'
    })
  ] 
};