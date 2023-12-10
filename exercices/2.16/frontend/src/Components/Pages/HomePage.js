const main = document.querySelector('main'); // Sélectionne la balise 'main'

const HomePage = () => {
  renderGame(); // Appelle à la fonction
};

function renderGame(level) {
  fetch('http://localhost:3000/questions') // Requête pour obtenir les questions depuis le serveur local
    .then((response) => response.json())
    .then((questions) => {
      const randomQuestions = getRandomQuestions(questions, level); // Questions en fonction du niveau

      let qAndR = ''; // initialise une chaine de caractère
      let questionIndex = 0;

      randomQuestions.forEach((question) => { // Parcourt les questions aléatoires
        qAndR += `<h4>${question.question}</h4>`;

        let answerIndex = 0;

        question.answers.forEach((answer) => { // Parcourt les réponses associées à chaque question
          qAndR += `<p>${answer.text} <input type="radio" name="${questionIndex}" value="${answerIndex}"></p>`;
          answerIndex += 1;
        });

        questionIndex += 1;
      });

      qAndR += `<button id="calculateBtn">Calculate my score</button>`;
      main.innerHTML = qAndR;
      main.className = 'p-5'; // Pour mettre les questions au centre

      const check = document.querySelector('#calculateBtn');
      
      check.addEventListener('click', () => {
        const score = calculateScore(randomQuestions);
        main.innerHTML = `
        <h4>Your score is ${score} / 3 !</h4>
        <div><button id="replayBtn">Replay</button></div>
        `;
        const button = document.querySelector('#replayBtn');
        button.addEventListener('click', HomePage);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function getRandomQuestions(questions, level) {
  if (level) {
    const questionsLevelled = questions.filter((question) => question.level === level);
    return getRandomSample(questionsLevelled, 3); // Utilise la fonction getRandomSample pour obtenir un échantillon aléatoire
  }
  return getRandomSample(questions, 3);
}

function getRandomSample(array, size) {
  const shuffled = array.slice().sort(() => Math.random() - 0.5); // Copie et mélange le tableau avec la méthode de tri aléatoire
  return shuffled.slice(0, size); // Sélectionne les premiers éléments pour former l'échantillon
}

function calculateScore(questionsFiltered) {
  let score = 0;
  const radioButtons = document.querySelectorAll('input'); // Sélectionne tous les boutons radio dans le document

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      if (questionsFiltered[Number(radioButton.name)].answers[Number(radioButton.value)].isCorrect) // Vérifie réponse correcte
        score += 1; // Incrémente le score si la réponse est correcte
    }
  });

  return score;
}

export default HomePage;
