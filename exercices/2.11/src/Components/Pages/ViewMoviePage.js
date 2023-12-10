import { readAllMovies } from '../../models/movies';

const ViewMoviePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '<div id="movieWrapper" class="table-responsive p-5"></div>';

  const movieWrapper = document.querySelector('#movieWrapper');

  const movies = readAllMovies();
  if (!movies || movies.length === 0) {
    movieWrapper.innerHTML = '<p class="p-5">No movies yet : (</p>';
    return;
  }

  const htmlMovieTable = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Duration (min)</th>
          <th scope="col">Budget (million)</th>    
        </tr>
      </thead>
      <tbody>
        ${getHtmlRows(movies)}
      </tbody>
    </table>`;

  movieWrapper.innerHTML = htmlMovieTable;
};

function getHtmlRows(movies) {
  let htmlRows = '';
  movies.forEach((element) => {
    htmlRows += `
      <tr>
        <td><a href="${element.link}" target="_blank">${element.title}</a></td>
        <td>${element.duration}</td>
        <td>${element.budget}</td>
      </tr>
    `;
  });

  return htmlRows;
}

export default ViewMoviePage;
