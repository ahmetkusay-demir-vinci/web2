let numberOfClick = 0;
const messageContenu = document.querySelector(".message");
const compteurContenu = document.querySelector(".counter");

window.addEventListener("click", () => {
  ++numberOfClick;
  compteurContenu.innerText = numberOfClick;
  if (numberOfClick === 5) messageContenu.innerText = "Bravo, bel échauffement !";
  else if (numberOfClick === 10)
    messageContenu.innerText = "Vous êtes passé maître en l'art du clic !";
});
