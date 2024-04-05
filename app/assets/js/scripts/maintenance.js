const maintenance_text = document.getElementById('maintenanceButton')

function setMaintenanceStatus(details) {
    maintenance_text.innerHTML = details
}

document.getElementById('maintenanceButton').addEventListener('click', async e => {
    loggerLanding.info('Refreshing maintenance status...')
    try {
        fetchMaintenanceStatus(url)
            .then(async maintenanceStatus => {
                if (maintenanceStatus == true) {
                    setMaintenanceStatus('Maintenance en cours...')
                    setTimeout(() => {
                        setMaintenanceStatus('Réessayer')
                    }, 5000)
                } else {
                    switchView(VIEWS.maintenance, VIEWS.landing)
                }
            })
            .catch(error => {
                console.error('Une erreur est survenue : ', error);
            });
    } catch (err) {
        loggerLanding.error('Unhandled error in during launch process.', err)
        showLaunchFailure(Lang.queryJS('landing.launch.failureTitle'), Lang.queryJS('landing.launch.failureText'))
    }
})