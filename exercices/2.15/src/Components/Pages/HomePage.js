import { clearPage } from "../../utils/render";

const HomePage = () => {
  clearPage();
  const main = document.querySelector('main');

  fetch('https://v2.jokeapi.dev/joke/Any?type=single')
  .then((response) => response.json())
  .then((jokes) => {
    main.innerHTML = `
      <div>
      <table class="table">
      <thead>
        <tr>
          <th scope="col">Blague</th>
          <th scope="col">Catégorie de la blague</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${jokes.joke}</td>
          <td>${jokes.category}</td>
        </tr>
      </tbody>
    </table>
      </div>
    `;
  })
  .catch((err) => {
    console.error('HomePage::error: ', err);
  });

  
};

export default HomePage;
