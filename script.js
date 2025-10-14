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

getAll();

async function getByDateAndPlace(date, place) {
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
const placeselect = document.querySelector('#standort_dropdown');
const btn_search = document.querySelector('#searchBtn');

btn_search.addEventListener('click', function () {
    loadData();
})

function loadData() {
    const date = datepicker.value;
    const place = placeselect.value;
    getByDateAndPlace(date, place);
}

/* Stationpin Klick */
const pin_Hauptbahnhof_West = document.querySelector('#Hauptbahnhof_West');

pin_Hauptbahnhof_West.addEventListener('click', function () {
    console.log('Hauptbahnhof_West');
    showDialogByPlace('Hauptbahnhof_West');
})

const dialog = document.querySelector('#dialog');
const standort = document.querySelector('#standort');
function showDialogByPlace(place) {
    dialog.showModal();
    standort.innerText = place;
}

const btn_close = document.querySelector('#close');
btn_close.addEventListener('click', function () {
    dialog.close();
    standort.innerText = '';
});

