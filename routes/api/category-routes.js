const router = require('express').Router();
const { createQuery } = require('mysql2');
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id',
      'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: {
          model: Tag,
          attributes: ['tag_name']
        }
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id',
      'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        include: {
          model: Tag,
          attributes: ['tag_name']
        }
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
    res.json(dbCategoryData);
  });
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
    res.json(dbCategoryData);
  });
  // delete a category by its `id` value
});

module.exports = router;
