class EnterpriseMap {
    constructor() {
        this.currentZone = '';
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateTimestamp();
        this.simulateAlerts();
        
        if (APP_CONFIG.updateInterval > 0) {
            this.startAutoUpdate();
        }
    }

    setupEventListeners() {
        // Gestionnaire de clic sur les zones
        document.querySelectorAll('.zone').forEach(zone => {
            zone.addEventListener('click', (e) => {
                const zoneId = e.currentTarget.dataset.zone;
                this.handleZoneClick(zoneId);
            });
        });

        // Fermer les modals avec Echap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAlert();
                this.closeGrafana();
            }
        });

        // Fermer modal en cliquant à l'extérieur
        document.getElementById('grafanaModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeGrafana();
            }
        });
    }

    handleZoneClick(zoneId) {
        this.currentZone = zoneId;
        const config = ZONES_CONFIG[zoneId];
        
        if (!config) {
            console.error(`Configuration non trouvée pour la zone: ${zoneId}`);
            return;
        }
        
        // Vérifier s'il y a des alertes
        if (config.alerts.length > 0) {
            this.showAlert(zoneId);
        } else {
            this.openGrafana(zoneId);
        }
    }

    showAlert(zoneId) {
        const config = ZONES_CONFIG[zoneId];
        const popup = document.getElementById('alertPopup');
        const title = document.getElementById('alertTitle');
        const message = document.getElementById('alertMessage');
        
        title.textContent = `⚠️ Alerte - ${config.title}`;
        message.innerHTML = config.alerts.join('<br>');
        
        popup.classList.add('show');
    }

    closeAlert() {
        document.getElementById('alertPopup').classList.remove('show');
    }

    openGrafana(zoneId) {
        this.closeAlert();
        const config = ZONES_CONFIG[zoneId];
        const modal = document.getElementById('grafanaModal');
        const title = document.getElementById('grafanaTitle');
        const dashboardTitle = document.getElementById('dashboardTitle');
        
        title.textContent = `Dashboard - ${config.title}`;
        dashboardTitle.textContent = `Métriques - ${config.title}`;
        
        if (APP_CONFIG.grafanaEmbedded && config.grafanaUrl) {
            // Utiliser vraie iframe Grafana
            this.loadGrafanaIframe(config.grafanaUrl);
        } else {
            // Utiliser dashboard mockup
            this.updateMetrics(config.metrics);
        }
        
        modal.classList.add('show');
    }

    loadGrafanaIframe(url) {
        const frame = document.getElementById('grafanaFrame');
        frame.innerHTML = `<iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>`;
    }

    updateMetrics(metrics) {
        document.getElementById('metric1').textContent = metrics.rendement;
        document.getElementById('metric2').textContent = metrics.pieces;
        document.getElementById('metric3').textContent = metrics.qualite;
        document.getElementById('metric4').textContent = metrics.defauts;
        document.getElementById('metric5').textContent = metrics.temperature;
        document.getElementById('metric6').textContent = metrics.etat;
        
        this.updateTimestamp();
    }

    closeGrafana() {
        document.getElementById('grafanaModal').classList.remove('show');
    }

    getCurrentZone() {
        return this.currentZone;
    }

    simulateAlerts() {
        const zones = document.querySelectorAll('.zone');
        zones.forEach(zone => {
            const status = zone.querySelector('.zone-status');
            const zoneId = zone.dataset.zone;
            const config = ZONES_CONFIG[zoneId];
            
            if (config && config.alerts.length > 0) {
                if (config.alerts.some(alert => alert.includes('ARRÊT'))) {
                    status.className = 'zone-status status-error';
                } else {
                    status.className = 'zone-status status-warning';
                }
            } else {
                status.className = 'zone-status status-ok';
            }
        });
    }

    updateTimestamp() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('fr-FR');
        const timestampEl = document.getElementById('lastUpdate');
        if (timestampEl) {
            timestampEl.textContent = timeString;
        }
    }

    async fetchZoneData() {
        try {
            const response = await fetch(APP_CONFIG.apiEndpoint);
            if (response.ok) {
                const data = await response.json();
                this.updateZonesData(data);
            }
        } catch (error) {
            console.log('Mode simulation - pas de connexion API');
        }
    }

    updateZonesData(data) {
        Object.keys(data).forEach(zoneId => {
            if (ZONES_CONFIG[zoneId]) {
                ZONES_CONFIG[zoneId] = { ...ZONES_CONFIG[zoneId], ...data[zoneId] };
            }
        });
        
        this.simulateAlerts();
        this.updateGlobalStats();
    }

    updateGlobalStats() {
        // Calculer les statistiques globales
        const zones = Object.values(ZONES_CONFIG);
        const totalRendement = zones.reduce((sum, zone) => {
            return sum + parseFloat(zone.metrics.rendement);
        }, 0) / zones.length;
        
        document.getElementById('global-production').textContent = `${Math.round(totalRendement)}%`;
    }

    startAutoUpdate() {
        this.updateInterval = setInterval(() => {
            this.fetchZoneData();
        }, APP_CONFIG.updateInterval);
    }

    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Fonctions globales pour compatibilité avec le HTML
function closeAlert() {
    window.enterpriseMap.closeAlert();
}

function closeGrafana() {
    window.enterpriseMap.closeGrafana();
}

function openGrafana(zoneId) {
    window.enterpriseMap.openGrafana(zoneId);
}

function getCurrentZone() {
    return window.enterpriseMap.getCurrentZone();
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    window.enterpriseMap = new EnterpriseMap();
});