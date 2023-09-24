var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


let liens = [];
let compteurs = [];
app.use((req, res, next) => {               //On déclare un middleware qui sera exécuté pour chaque requête entrante
    let lien = req.method +" "+req.path;    // req.method représente la méthode HTTP (GET , POST) , req.path le chemin (/films)
    let position = liens.indexOf(lien);     // Si le chemin existe dans le tableau liens , on renvoie l'indice de sa position sinon on renvoie -1

    console.log(position);    
    if (position === -1){         //Le chemin n'existe pas encore dans le tableau liens
        liens.push(lien);         //Le chemin est ajouté dans le tableau et le compteur est initialisé à 1
        compteurs.push(1);
    }
    else{
        compteurs[position] = compteurs[position]+1     //Le compteur est incrémenté 
    }

    console.log("Request counter :");
    for (let i = 0; i < liens.length; i++) {                  //Parcours du tableau liens
        console.log("- "+liens[i] + " : "+ compteurs[i]);;    
        
    }

    next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);


module.exports = app;
