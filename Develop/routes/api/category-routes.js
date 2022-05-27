const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [Product],
  });

  res.json(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  });

  res.json(category);
});

router.post("/", async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body);
  res.json(newCategory);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(updateCategory);
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json("deleted");
});

module.exports = router;
