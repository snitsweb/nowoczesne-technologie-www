const sass = require('sass');
const path = require('path')

const result = sass.compile(path.resolve(__dirname, '../css/index.scss'), {
  style: 'compressed',
  loadPaths: [path.resolve(__dirname, '../css/index.scss')]
});
console.log(result)