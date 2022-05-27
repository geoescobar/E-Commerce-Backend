const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const categories = await Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  });
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const oneProduct = await Tag.findOne({
    include: [{ model: Product, through: ProductTag }],
    where: {
      id: req.params.id,
    },
  });

  res.json(oneProduct);
});

router.post("/", async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
  res.json(newTag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(updateTag);
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json("deleted");
});

module.exports = router;
