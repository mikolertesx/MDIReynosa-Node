const fs = require('fs');
const path = require('path');

module.exports.deleteFile = (file) => {
  console.log(file);
  try {
    file = decodeURIComponent(file);
    console.log(file);
    fs.unlink(path.join('public', file), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}