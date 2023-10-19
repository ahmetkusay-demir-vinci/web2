const red = document.querySelector(".red");
const orange = document.querySelector(".orange");
const green = document.querySelector(".green");
let counter = 0;

startClock();

function startClock() {
  myIntervalId = setInterval(light, 1000);
}

function light() {
    if(counter == 0){
        ++ counter;
        red.style.backgroundColor = "white";
        orange.style.backgroundColor = "orange"
    } else if(counter == 1){
        ++ counter;
        orange.style.backgroundColor = "white";
        green.style.backgroundColor = "green"
    } else if(counter == 2){
        ++ counter;
        green.style.backgroundColor = "white";
        orange.style.backgroundColor = "orange"
    } else if(counter == 3){
        orange.style.backgroundColor = "white";
        red.style.backgroundColor = "red"
        counter = 0;
    }
}