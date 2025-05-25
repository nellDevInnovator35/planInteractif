// config/zones-config.js - Version corrigée avec votre URL Grafana

const GRAFANA_CONFIG = {
    baseUrl: 'https://nellp12321.grafana.net', // Votre URL Grafana Cloud
    orgId: 1,
    theme: 'dark', // light ou dark
    refresh: '5s',
};

// Configuration des zones avec votre URL Grafana
const ZONES_CONFIG = {
    moule1: {
        title: 'Zone Moules 1',
        alerts: [],
        // ✅ URL corrigée pour l'embed - Mode kiosk pour supprimer les menus
        grafanaUrl: 'https://nellp12321.grafana.net/public-dashboards/47725e36bda547b3bc55350b7eda766a',
        
        // Alternative: Mode solo pour un panel spécifique
        grafanaSoloUrl: 'https://nellp12321.grafana.net/public-dashboards/47725e36bda547b3bc55350b7eda766a',
        
        metrics: {
            rendement: '92%',
            pieces: '1,456',
            qualite: '99.1%',
            defauts: '0.9%',
            temperature: '38°C',
            etat: 'Optimal'
        }
    },
    moule2: {
        title: 'Zone Moules 2',
        alerts: ['Température élevée détectée', 'Maintenance préventive requise'],
        // Pour l'instant, on garde le mock pour les autres zones
        grafanaUrl: null,
        metrics: {
            rendement: '78%',
            pieces: '987',
            qualite: '96.5%',
            defauts: '3.5%',
            temperature: '48°C',
            etat: 'Attention'
        }
    },
    moule3: {
        title: 'Zone Moules 3',
        alerts: ['ARRÊT MACHINE - Intervention requise', 'Défaut de qualité critique'],
        grafanaUrl: null,
        metrics: {
            rendement: '0%',
            pieces: '0',
            qualite: '85.2%',
            defauts: '14.8%',
            temperature: '25°C',
            etat: 'Arrêtée'
        }
    },
    retravail: {
        title: 'Zone Retravail',
        alerts: [],
        grafanaUrl: null,
        metrics: {
            rendement: '95%',
            pieces: '234',
            qualite: '99.8%',
            defauts: '0.2%',
            temperature: '22°C',
            etat: 'Optimal'
        }
    },
    emballage: {
        title: 'Zone Emballage',
        alerts: [],
        grafanaUrl: null,
        metrics: {
            rendement: '89%',
            pieces: '2,103',
            qualite: '99.9%',
            defauts: '0.1%',
            temperature: '20°C',
            etat: 'Optimal'
        }
    },
    entrepot: {
        title: 'Entrepôt',
        alerts: [],
        grafanaUrl: null,
        metrics: {
            rendement: '94%',
            pieces: '15,678',
            qualite: '99.5%',
            defauts: '0.5%',
            temperature: '18°C',
            etat: 'Optimal'
        }
    }
};

// ✅ IMPORTANT: Activer l'intégration Grafana
const APP_CONFIG = {
    updateInterval: 30000,
    grafanaEmbedded: true, // ✅ DOIT être à true pour voir Grafana
    grafanaMode: 'newtab', // 'newtab', 'popup', 'iframe' (iframe ne fonctionne pas avec Cloud gratuit)
    apiEndpoint: '/api/zones',
    enableNotifications: true,
    grafanaConfig: GRAFANA_CONFIG
};