const { FILE_PATH } = require('../constants');

async function getOptionsData() {
  return fetch(FILE_PATH)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error loading JSON:', error);
    });
}

module.exports = { getOptionsData };