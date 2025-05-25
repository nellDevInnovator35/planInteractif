// Configuration des zones et leurs données
const ZONES_CONFIG = {
    moule1: {
        title: 'Zone Moules 1',
        alerts: [],
        grafanaUrl: 'https://your-grafana-instance.com/d/dashboard1', // À remplacer
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
        grafanaUrl: 'https://your-grafana-instance.com/d/dashboard2', // À remplacer
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
        grafanaUrl: 'https://your-grafana-instance.com/d/dashboard3', // À remplacer
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
        grafanaUrl: 'https://your-grafana-instance.com/d/dashboard4', // À remplacer
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
        grafanaUrl: 'https://your-grafana-instance.com/d/dashboard5', // À remplacer
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
        grafanaUrl: 'https://your-grafana-instance.com/d/dashboard6', // À remplacer
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

// Configuration globale
const APP_CONFIG = {
    updateInterval: 30000, // 30 secondes
    grafanaEmbedded: false, // true pour iframe, false pour mock
    apiEndpoint: '/api/zones', // Endpoint pour les données temps réel
    enableNotifications: true
};