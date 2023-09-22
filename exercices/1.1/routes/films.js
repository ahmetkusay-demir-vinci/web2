var express = require('express');
var router = express.Router();

const MENU = [
  {
    id: 1,
    title: 'titre1',
    duration: 'duration1',
    budget: 'budget1',
    link: 'link1',
  },
  {
    id: 2,
    title: 'titre2',
    duration: 'duration2',
    budget: 'budget2',
    link: 'link2',
  },
  {
    id: 3,
    title: 'titre3',
    duration: 'duration3',
    budget: 'budget3',
    link: 'link3',
  },
];

// Read all the films from the menu
router.get('/', (req, res, next) => {
  console.log('GET /films');
  res.json(MENU);
});

module.exports = router;