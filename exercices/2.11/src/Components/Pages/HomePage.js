import stalinImage from '../../img/Stalin.jpg';
import hitlerImage from '../../img/Hitler.jpg';

const main = document.querySelector('main');

const HomePage = () => {
  const homePage = `
    <div>
        <h1 class="text-center text-bg-primary p-3">Welcome to myMovies</h1>
        <h4 class="text-center ">Here you can find a selection of our favorite horror movies !</h4>
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
};

export default HomePage;
