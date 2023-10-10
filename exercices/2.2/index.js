let counter = 0;
const messageContenu = document.querySelector(".message");
const compteurContenu = document.querySelector(".counter");

window.addEventListener("click", () => {
  ++counter;
  compteurContenu.innerText = counter;
  if (counter === 5) messageContenu.innerText = "Bravo, bel échauffement !";
  else if (counter === 10)
    messageContenu.innerText = "Vous êtes passé maître en l'art du clic !";
});
