async function fetchMaintenanceStatus(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const maintenanceStatus = data.maintenance;
        return maintenanceStatus;
    } catch (error) {
        console.error('Une erreur est survenue : ', error);
        throw error;
    }
}

const url = 'https://launcher.onelords.fr/maintenance.json';
const maintenanceButton = document.getElementById('maintenanceButton');

maintenanceButton.addEventListener('click', () => {
    maintenanceButton.innerHTML = 'Maintenance en cours...';
    maintenanceButton.disabled = true;
    fetchMaintenanceStatus(url)
        .then(maintenanceStatus => {
            if (maintenanceStatus == false) {
                switchView(VIEWS.maintenance, VIEWS.landing)
            }
        })
        .catch(error => {
            console.error('Une erreur est survenue : ', error);
        });
    setTimeout(() => {
        maintenanceButton.innerHTML = 'Réessayer';
        // Réactivez le bouton après la fin de la maintenance
        maintenanceButton.disabled = false;
    }, 5000);
});