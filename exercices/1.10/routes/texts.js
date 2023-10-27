const express = require('express');
const {
  validatedLevel,
  readAll,
  readOne,
  createOne,
  deleteOne,
  updateOne,
} = require('../models/texts');

const router = express.Router();

// Read all the texts, filtered by level if the query param exists
router.get('/', (req, res) => {
  const allTexts = readAll(req?.query?.level);

  if (allTexts === undefined) return res.sendStatus(400);

  return res.json(allTexts);
});

// Read a text from its id
router.get('/:id', (req, res) => {
  const foundText = readOne(req.params.id);

  if (!foundText) return res.sendStatus(404);

  return res.json(foundText);
});

// Create a text
router.post('/', (req, res) => {
  const level = validatedLevel(req?.body?.level) ? req.body.level : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  if (!level || !content) return res.sendStatus(400); // error code '400 Bad request'

  const createdText = createOne(level, content);

  return res.json(createdText);
});

// Delete a text
router.delete('/:id', (req, res) => {
  const deletedText = deleteOne(req.params.id);

  if (!deletedText) return res.sendStatus(404);

  return res.json(deletedText);
});

// Update a Text only if all properties are given
router.put('/:id', (req, res) => {
  const level = validatedLevel(req?.body?.level) ? req.body.level : undefined;
  const content = req?.body?.content;

  if ((!level && !content) || level?.length === 0 || content?.length === 0) {
    return res.sendStatus(400);
  }

  const updatedText = updateOne(req.params.id, { level, content });

  if (!updatedText) return res.sendStatus(404);

  return res.json(updatedText);
});

module.exports = router;