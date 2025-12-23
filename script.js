async function getByDateAndPlace(date, place) {
    const url = `https://nextbike-leipzig-im3.interaktive-medien-portfolio.ch/backend/api/getByDate.php?date=${date}&place=${place}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById('dialog');
    const stationName = document.getElementById('station-name');
    const closeDialog = document.getElementById('close-dialog');
    const dialogDatepicker = document.getElementById('dialog-datepicker');
    const tempValue = document.getElementById('temp-value');
    const rainValue = document.getElementById('rain-value');
    const marker_list = document.querySelectorAll(".marker");

    let chart = null;
    let currentPlace = null;

    console.log("Marker gefunden:", marker_list.length);

    // Marker-Klick: Dialog öffnen und Daten laden
    marker_list.forEach(marker => {
        marker.addEventListener("click", async function () {
            const name = this.getAttribute("data-name");
            const place = this.getAttribute("data-uid");
            const date = new Date().toISOString().slice(0, 10);

            stationName.textContent = name;
            dialogDatepicker.value = date;
            dialog.classList.remove('hidden');

            currentPlace = place;

            await loadChartData(date, place);
        });
    });

    dialogDatepicker.addEventListener("input", async function () {
        const date = dialogDatepicker.value;
        await loadChartData(date, currentPlace);
    });

    async function loadChartData(date, place) {
        const data = await getByDateAndPlace(date, place);

        const morning = data.find(entry => entry.timestamp.includes('06:30'));
        const noon = data.find(entry => entry.timestamp.includes('11:30'));
        const evening = data.find(entry => entry.timestamp.includes('18:30'));

        tempValue.textContent = data[0]?.temp ?? '--';
        rainValue.textContent = data[0]?.rain ?? '--';


        const labels = ['Morgens', 'Mittags', 'Abends'];
        const booked = [morning?.booked ?? 0, noon?.booked ?? 0, evening?.booked ?? 0];
        const available = [morning?.available ?? 0, noon?.available ?? 0, evening?.available ?? 0];

        if (chart) chart.destroy();
        const canvas = document.getElementById('chart');
        chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Verfügbare Bikes', data: available, backgroundColor: '#FFD700' },
                    { label: 'Gebuchte Bikes', data: booked, backgroundColor: '#28526A' }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { stacked: true, ticks: { color: '#FFDD00' }},
                    y: { stacked: true, beginAtZero: true, min: 0, max:60, ticks: { color: '#FFDD00' } }
                },
                plugins: {
                    legend: {labels: { color: '#FFDD00'} }
                }
            }
        });

        console.log('data:', data);
    }

    closeDialog.addEventListener("click", () => {
        dialog.classList.add('hidden');
    });
});





