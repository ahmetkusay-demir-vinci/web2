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
    res.sendStatus(404);
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
                                                                                 //On reg si l'id du film correspond à l'id de l'URL
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


  const existingFilm = films.find(
    (film) => film.title.toLowerCase() === title.toLowerCase()
  );
  if (existingFilm) return res.sendStatus(409); // error code '409 Conflict'


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



// Delete a film from the menu based on its id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const foundIndex = films.findIndex(film => film.id == req.params.id);  // On récupère l'élément qu'on veut effacer et si on trouve pas d'élément avec l'identifiant passé en paramètre , la méthode renvoie -1

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromFilms = films.splice(foundIndex, 1); // splice effacera 1 élément à partie de l'index trouvé 
  const itemRemoved = itemsRemovedFromFilms[0]; // splice renvoie un tableau de tt les éléments supprimés
                                                // Pour ça on cherche le 1 er élément dans le tableau et y en aura que 1 vu que l'id est unique 
  res.json(itemRemoved); // On renvoie l'élément effacé
});



// Update one or more properties of a film identified by its id
router.patch('/:id', function (req, res) {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  // On va tester les paramètres que nous avons reçu
  if (
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim()) ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id); //On passe une fonction qui va être itéré sur chaque éléments de notre MENU (films)
                                                                                //On reg si l'id du film correspond à l'id de l'URL

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const updatedFilm = {...films[indexOfFilmFound], ...req.body}; // On copie les propriétés de l'objet trouvé dans le tableau et on écrase les propriétés mise dans le body de la requête

  films[indexOfFilmFound] = updatedFilm;

  return res.json(updatedFilm);
});




// Update a film only if all properties are given or create it if it does not exist and the id is not existant
router.put('/:id', function (req, res) {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const id = req.params.id;
  const indexOfFilmFound = films.findIndex((film) => film.id == id);

  if (indexOfFilmFound < 0) {
    const newFilm = { id, title, link, duration, budget };
    films.push(newFilm);
    return res.json(newFilm);
  }

  const filmPriorToChange = films[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  films[indexOfFilmFound] = updatedFilm;

  return res.json(updatedFilm);
});



module.exports = router;