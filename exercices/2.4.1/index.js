const button = document.querySelector("button");

let numberOfClick = 0;
let atStart;

let timeoutID;
const delayInSeconds = 5;
const delayInMiliSeconds = delayInSeconds * 1000;

button.addEventListener('mouseover', () => {
    timeoutID = setTimeout(() => {
        alert(`Game over, you did not click 10 times within ${delayInSeconds}s ago!`);
      }, delayInMiliSeconds);
    atStart = new Date();
});

button.addEventListener('click', () => {
    ++numberOfClick;
    if(numberOfClick == 10){
        clearTimeout(timeoutID);
        let endOfTheTime = new Date() - atStart;
        alert(`You win ! You clicked 10 times within ${endOfTheTime}ms`);
    }
});