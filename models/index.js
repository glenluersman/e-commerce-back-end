// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

Category.hasMany(Product, {
  foreignKey: 'category_id'
});

Product.hasMany(Tag, {
  through: ProductTag,
  as: 'product_tag',
  foreignKey: 'product_id'
});

Tag.hasMany(Product, {
  through: ProductTag,
  as: 'product_tag',
  foreignKey: 'tag_id'
});



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
