const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename;
  })
  .forEach(file => {
    router.use(`/${file}`, require(`./${file}`));
  });

module.exports = router;
