/* async function getAll() {
    const url = 'https://nextbike-leipzig-im3.interaktive-medien-portfolio.ch/backend/api/getAll.php';
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // gibt die Daten der API in der Konsole aus
    } catch (error) {
    console.error(error)
}
}

getAll (); */

async function getByDate(date){
    const url = `https://nextbike-leipzig-im3.interaktive-medien-portfolio.ch/backend/api/getByDate.php?date=${date}`;
try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
} catch (error) {
        console.error(error)
}
}
const datepicker = document.querySelector('#datepicker');
datepicker.addEventListener('change', function(){
    const date = datepicker.value;
    getByDate(date)
    console.log(date);
})

/* Button Suche zu*/

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