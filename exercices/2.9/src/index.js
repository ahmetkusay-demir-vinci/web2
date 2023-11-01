import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import stalinImage from './img/Stalin.jpg';
import hitlerImage from './img/Hitler.jpg';

const main = document.querySelector('main');

renderHomePage();

function renderHomePage() {
  const homePage = `
    <div>
        <h1 class="text-center text-bg-primary p-3">Welcome to myMovies</h1>
        <h4 class="text-center ">Here you can find a selection of our favorite horror movies !</h4>
    </div>

    <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-danger" id="button1">About</button>
    </div>


    <div class="container">
        <div class="row">
            <div class="col-6 text-center">
                <img src="${stalinImage}" class="img-fluid" alt="Image de Stalin">
            </div>
            <div class="col-6 text-center">
                <img src="${hitlerImage}" class="img-fluid" alt="Image de Hitler">
            </div>
        </div>
    </div>
    `;

  main.innerHTML = homePage;
  const button = document.querySelector('#button1');
  button.addEventListener('click', renderAboutPage);
}

function renderAboutPage() {
  const aboutPage = `
    <div>
        <h1 class="text-center">About Mr.Demir Ahmet Kusay</h1>

        <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-danger" id="button2">Back</button>
        </div>

        <br>
        <p> He is a student at Vinci who enjoys coding in JS...</p>
    </div>
    `;

  main.innerHTML = aboutPage;
  const button = document.querySelector('#button2');
  button.addEventListener('click', renderHomePage);
}
