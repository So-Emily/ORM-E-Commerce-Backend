const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((products) => res.json(products))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: { id: req.params.id },
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((product) => res.json(product))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // if there are product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      // Fetch existing product tags
      const existingProductTags = await ProductTag.findAll({
        where: { product_id: product.id }
      });

      // Create a set of existing tag IDs for quick lookup
      const existingTagIds = new Set(existingProductTags.map(({ tag_id }) => tag_id));

      // Filter out tag IDs that already exist
      const newTagIds = req.body.tagIds.filter(tag_id => !existingTagIds.has(tag_id));

      // Create pairings for new tag IDs
      const productTagIdArr = newTagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });

      // Bulk create new product tags
      if (productTagIdArr.length) {
        await ProductTag.bulkCreate(productTagIdArr);
      }
    }

    // if no product tags, just respond
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
