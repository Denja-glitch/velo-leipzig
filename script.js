async function getAll() {
    const url = 'https://nextbike-leipzig-im3.interaktive-medien-portfolio.ch/backend/api/getAll.php';
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // gibt die Daten der API in der Konsole aus
    } catch (error) {
    console.error(error)
}
}

getAll (); 

async function getByDateAndPlace(date, place){
    const url = `https://nextbike-leipzig-im3.interaktive-medien-portfolio.ch/backend/api/getByDate.php?date=${date}&place=${place}`;
try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
} catch (error) {
        console.error(error)
}
}

const datepicker = document.querySelector('#datepicker');
const placeselect = document.querySelector ('#standort_dropdown');
const btn_search = document.querySelector ('#searchBtn');

btn_search.addEventListener('click', function (){
    loadData();
})

function loadData(){
    const date = datepicker.value;
    const place = placeselect.value;
    getByDateAndPlace(date, place);
}



/* Button Suche zu */

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
}); 