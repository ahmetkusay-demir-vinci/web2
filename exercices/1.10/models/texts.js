const { v4: uuidv4 } = require('uuid');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/pizzas.json');

function validatedLevel(level) {
  const existingLevels = ['easy', 'medium', 'hard'];

  return existingLevels.includes(level);
}

function readAll(level) {
  const texts = parse(jsonDbPath);

  if (level === undefined) return texts;

  if (!validatedLevel(level)) return undefined;

  const textsFiltered = texts.filter((text) => text.level === level);
  return textsFiltered;
}

function readOne(id) {
  const texts = parse(jsonDbPath);
  const indexOfTextFound = texts.findIndex((text) => text.id === id);

  if (indexOfTextFound < 0) return undefined;

  return texts[indexOfTextFound];
}

function createOne(content, level) {
  const texts = parse(jsonDbPath);

  const createdText = {
    id: uuidv4,
    content,
    level,
  };

  texts.push(createdText);

  serialize(jsonDbPath, texts);

  return createdText;
}

function deleteOne(id) {
  const idNumber = parseInt(id, uuidv4);
  const texts = parse(jsonDbPath);
  const foundIndex = texts.findIndex((text) => text.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedTexts = texts.splice(foundIndex, 1);
  const deletedText = deletedTexts[0];
  serialize(jsonDbPath, texts);

  return deletedText;
}

function updateOne(id, propertiesToUpdate) {
  
  const texts = parse(jsonDbPath);
  const foundIndex = texts.findIndex((text) => text.id === id);
  if (foundIndex < 0) return undefined;

  const updatedText = { ...texts[foundIndex], ...propertiesToUpdate };

  texts[foundIndex] = updatedText;

  serialize(jsonDbPath, texts);

  return updatedText;
}

module.exports = {
  validatedLevel,
  readAll,
  readOne,
  createOne,
  deleteOne,
  updateOne,
};
