const formulaire = document.querySelector('form');
const wish = document.querySelector('#wish');
const message = document.querySelector('#message');

formulaire.addEventListener ("submit", (e) => {
    e.preventDefault();
    formulaire.style.display = "none";
    message.innerHTML = `${wish.value} 
        <br> 
        <form>
            <button>Reset</button>
        </form> `;
});
