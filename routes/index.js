const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  // res.send("<h1>Wrong Route!</h1>")
  res.send(`
    <h1>Wrong Route!</h1>
    <button onclick="window.open('/api/products', '_blank')">Products</button>
    <button onclick="window.open('/api/categories', '_blank')">Categories</button>
    <button onclick="window.open('/api/tags', '_blank')">Tags</button>
  `);
});

module.exports = router;