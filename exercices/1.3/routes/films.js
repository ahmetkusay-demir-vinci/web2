var express = require('express');
var router = express.Router();


const films = [
  {
    id: 1,
    title: 'Star Wars: The Phantom Menace (Episode I)',
    duration: 136,
    budget: 115,
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace',
  },
  {
    id: 2,
    title: 'Star Wars: Episode II – Attack of the Clones',
    duration: 142,
    budget: 115,
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_II_%E2%80%93_Attack_of_the_Clones',
  },
  {
    id: 3,
    title: "Zack Snyder's Justice League",
    duration: 242,
    budget: 70,
    link: 'https://en.wikipedia.org/wiki/Zack_Snyder%27s_Justice_League',
  },
];


// Read all the films from the menu
//filtered by minimum-duration if the query param exists
router.get('/', (req, res, next) => {

  const minimumFilmDuration = req?.query['minimum-duration'];    //On récupère le paramètre 
  console.log(minimumFilmDuration);

  if (minimumFilmDuration === undefined) {
    res.json(films);
    return;         // Sortir de la fonction pour éviter l'exécution suivante
  }

  const parsedDuration = parseInt(minimumFilmDuration);   //Conversion en entier
  console.log(parsedDuration);
  console.log(typeof parsedDuration);

  /* http://localhost:3000/films?minimum-duration=test   test n'est pas un entier */
  if (isNaN(parsedDuration)) {
    res.json('Le paramètre "minimum-duration" n\'est pas un nombre valide.');
    return; 
  }

  const evenFilms = films.filter(film => film.duration >= parsedDuration);
  console.log(evenFilms);
  
  console.log('GET /films')
  res.json(evenFilms);
});


// Paramètres de route
// Read the films identified by an id in the menu
// Ici on a une fonction middleware (callback càd une fonction que l'on passe à une autre fonction )
router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);   //On récupère ce qui a été mis dans l'URL de la requête

  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);  //On passe une fonction qui va être itéré sur chaque éléments de notre MENU (films)
                                                                                 //On reg si l'id de la pizza correspond à l'id de l'URL
  if (indexOfFilmFound < 0) return res.sendStatus(404);   //Pas de pizza trouvé => Error 404

  res.json(films[indexOfFilmFound]);
});


// Create a film to be added to the menu.
router.post('/', (req, res) => {

  //Vérification
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;  //trim() en JavaScript sert à supprimer les espaces blancs en début et en fin d'une chaîne de caractères
  const duration = typeof req?.body?.duration !== 'number' || req.body.duration < 0
  ? undefined
  : req.body.duration;
  const budget = typeof req?.body?.budget !== 'number' || req.body.budget < 0
  ? undefined
  : req.body.budget;
  const link = req?.body?.link?.trim()?.length !== 0 ? req.body.link : undefined;

  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  /* Morceau de code qui permet de générer un identifiant
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;*/

  const nextId = films.length +1;

  // On crée un objet de type film
  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link
  };

  films.push(newFilm);

  // On renvoie au client le film ajouté 
  res.json(newFilm);
});


module.exports = router;