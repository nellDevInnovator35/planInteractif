// js/app.js - Version corrigée pour votre Grafana

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
        
        // Debug
        console.log('🚀 Enterprise Map initialisée');
        console.log('📊 Grafana intégré:', APP_CONFIG.grafanaEmbedded);
        console.log('🔗 URL Grafana Zone 1:', ZONES_CONFIG.moule1.grafanaUrl);
        
        if (APP_CONFIG.updateInterval > 0) {
            this.startAutoUpdate();
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.zone').forEach(zone => {
            zone.addEventListener('click', (e) => {
                const zoneId = e.currentTarget.dataset.zone;
                console.log(`🖱️ Clic sur zone: ${zoneId}`);
                this.handleZoneClick(zoneId);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAlert();
                this.closeGrafana();
            }
        });

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
            console.error(`❌ Configuration non trouvée pour la zone: ${zoneId}`);
            return;
        }
        
        console.log(`📊 Configuration zone ${zoneId}:`, config);
        
        // Vérifier s'il y a des alertes
        if (config.alerts.length > 0) {
            console.log(`⚠️ Alerte détectée pour ${zoneId}, affichage popup`);
            this.showAlert(zoneId);
        } else {
            console.log(`✅ Pas d'alerte pour ${zoneId}, ouverture Grafana`);
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
        console.log(`🚨 Popup d'alerte affiché pour ${zoneId}`);
    }

    closeAlert() {
        document.getElementById('alertPopup').classList.remove('show');
        console.log('❌ Popup d alerte fermé');
    }


// js/app.js - Solution finale pour Grafana Cloud

// Remplacez la fonction openGrafana par cette version :
openGrafana(zoneId) {
    this.closeAlert();
    const config = ZONES_CONFIG[zoneId];
    const modal = document.getElementById('grafanaModal');
    const title = document.getElementById('grafanaTitle');
    
    title.textContent = `Dashboard - ${config.title}`;
    
    if (APP_CONFIG.grafanaEmbedded && config.grafanaUrl) {
        // 🚀 TOUJOURS ouvrir en nouvel onglet (iframe ne fonctionne pas)
        console.log(`🔗 Ouverture Grafana en nouvel onglet pour ${zoneId}`);
        this.openGrafanaDirectly(config, zoneId);
    } else {
        console.log(`📊 Dashboard simulé pour ${zoneId}`);
        this.showSimulatedDashboard(config, zoneId);
    }
}

// 🔗 Ouvrir Grafana directement en nouvel onglet
openGrafanaDirectly(config, zoneId) {
    const modal = document.getElementById('grafanaModal');
    const frame = document.getElementById('grafanaFrame');
    
    // Ouvrir Grafana immédiatement
    const grafanaWindow = window.open(config.grafanaUrl, '_blank', 'noopener,noreferrer');
    
    // Interface de confirmation dans le modal
    frame.innerHTML = `
        <div class="grafana-success-container" style="height: 100%; background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; display: flex; justify-content: center; align-items: center; padding: 40px;">
            
            <div class="success-content" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(15px); padding: 50px; border-radius: 25px; max-width: 600px; text-align: center; border: 1px solid rgba(255,255,255,0.2);">
                
                <!-- Icône animée -->
                <div class="success-icon" style="width: 100px; height: 100px; margin: 0 auto 30px; position: relative;">
                    <div style="width: 100px; height: 100px; border: 3px solid rgba(76,175,80,0.3); border-radius: 50%; position: absolute; animation: pulse 2s infinite;"></div>
                    <div style="width: 100px; height: 100px; background: rgba(76,175,80,0.2); border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 3rem;">📊</div>
                </div>
                
                <h2 style="margin-bottom: 20px; color: #4CAF50; font-weight: 300;">Dashboard Grafana ouvert !</h2>
                
                <p style="margin-bottom: 30px; font-size: 1.1rem; opacity: 0.9; line-height: 1.6;">
                    Votre dashboard <strong style="color: #4CAF50;">${config.title}</strong><br>
                    s'ouvre dans un nouvel onglet de votre navigateur.
                </p>
                
                <!-- Actions -->
                <div class="action-buttons" style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-bottom: 35px;">
                    
                    <button onclick="window.open('${config.grafanaUrl}', '_blank')" 
                            class="action-btn primary" 
                            style="background: linear-gradient(45deg, #ff6b35, #f7931e); color: white; border: none; padding: 15px 25px; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 500; min-width: 160px; transition: all 0.3s ease;">
                        🔄 Rouvrir Grafana
                    </button>
                    
                    <button onclick="window.enterpriseMap.showSimulatedDashboard(ZONES_CONFIG['${zoneId}'], '${zoneId}')" 
                            class="action-btn secondary"
                            style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 15px 25px; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 500; min-width: 160px; transition: all 0.3s ease;">
                        📱 Vue locale
                    </button>
                    
                </div>
                
                <!-- Métriques en aperçu -->
                <div class="metrics-preview" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin-top: 30px;">
                    
                    <div class="metric-preview" style="background: rgba(76,175,80,0.2); border: 1px solid rgba(76,175,80,0.3); padding: 20px 15px; border-radius: 15px; text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: bold; color: #4CAF50; margin-bottom: 5px;">${config.metrics.rendement}</div>
                        <div style="font-size: 0.85rem; opacity: 0.8;">Rendement</div>
                    </div>
                    
                    <div class="metric-preview" style="background: rgba(33,150,243,0.2); border: 1px solid rgba(33,150,243,0.3); padding: 20px 15px; border-radius: 15px; text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: bold; color: #2196F3; margin-bottom: 5px;">${config.metrics.pieces}</div>
                        <div style="font-size: 0.85rem; opacity: 0.8;">Pièces/h</div>
                    </div>
                    
                    <div class="metric-preview" style="background: rgba(255,152,0,0.2); border: 1px solid rgba(255,152,0,0.3); padding: 20px 15px; border-radius: 15px; text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: bold; color: #FF9800; margin-bottom: 5px;">${config.metrics.temperature}</div>
                        <div style="font-size: 0.85rem; opacity: 0.8;">Température</div>
                    </div>
                    
                    <div class="metric-preview" style="background: rgba(156,39,176,0.2); border: 1px solid rgba(156,39,176,0.3); padding: 20px 15px; border-radius: 15px; text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: bold; color: #9C27B0; margin-bottom: 5px;">${config.metrics.etat}</div>
                        <div style="font-size: 0.85rem; opacity: 0.8;">État</div>
                    </div>
                    
                </div>
                
                <div class="tips" style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border-left: 4px solid #4CAF50;">
                    <p style="font-size: 0.9rem; opacity: 0.8; margin: 0;">
                        💡 <strong>Conseil :</strong> Épinglez l'onglet Grafana pour un accès rapide, ou ajoutez-le à vos favoris.
                    </p>
                </div>
                
            </div>
        </div>
        
        <style>
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            }
            
            .metric-preview:hover {
                transform: translateY(-3px);
                transition: transform 0.2s ease;
            }
        </style>
    `;
    
    modal.classList.add('show');
    
    // Vérifier si le popup a été bloqué
    if (!grafanaWindow) {
        this.showPopupBlocked(config, zoneId);
    }
}

// 🚫 Gérer le cas où le popup est bloqué
showPopupBlocked(config, zoneId) {
    const frame = document.getElementById('grafanaFrame');
    
    frame.innerHTML = `
        <div style="height: 100%; background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; display: flex; justify-content: center; align-items: center; padding: 40px;">
            <div style="background: rgba(255,255,255,0.1); padding: 40px; border-radius: 20px; max-width: 500px; text-align: center; border: 2px solid #ff6b35;">
                
                <div style="font-size: 4rem; margin-bottom: 25px;">🚫</div>
                <h3 style="color: #ff6b35; margin-bottom: 20px; font-weight: 300;">Popup bloqué par le navigateur</h3>
                
                <p style="margin-bottom: 30px; opacity: 0.9; line-height: 1.5;">
                    Votre navigateur a bloqué l'ouverture automatique du dashboard.<br>
                    Cliquez sur le bouton ci-dessous pour l'ouvrir manuellement :
                </p>
                
                <button onclick="window.open('${config.grafanaUrl}', '_blank')" 
                        style="background: linear-gradient(45deg, #ff6b35, #f7931e); color: white; border: none; padding: 18px 35px; border-radius: 12px; cursor: pointer; font-size: 1.2rem; font-weight: 600; margin-bottom: 25px; transition: transform 0.2s ease;">
                    🚀 Ouvrir Dashboard Grafana
                </button>
                
                <div style="font-size: 0.85rem; opacity: 0.7; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <strong>💡 Pour éviter cela :</strong><br>
                    Autorisez les popups pour ce site dans les paramètres de votre navigateur
                </div>
                
            </div>
        </div>
    `;
}

// 📊 Dashboard simulé amélioré
showSimulatedDashboard(config, zoneId) {
    const modal = document.getElementById('grafanaModal');
    const title = document.getElementById('grafanaTitle');
    const frame = document.getElementById('grafanaFrame');
    
    title.textContent = `Dashboard Local - ${config.title}`;
    
    frame.innerHTML = `
        <div class="mock-dashboard" style="width: 100%; height: 100%; background: linear-gradient(135deg, #1e3c72, #2a5298); display: flex; flex-direction: column; padding: 30px; color: white;">
            
            <div class="dashboard-header" style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 2rem; font-weight: 300; margin-bottom: 10px;">📊 ${config.title}</h2>
                <div style="display: flex; justify-content: center; align-items: center; gap: 20px; font-size: 0.9rem; opacity: 0.8;">
                    <span>🕒 Dernière MàJ: <span id="lastUpdate">${new Date().toLocaleTimeString('fr-FR')}</span></span>
                    ${config.grafanaUrl ? `<button onclick="window.open('${config.grafanaUrl}', '_blank')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 15px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">🔗 Ouvrir Grafana</button>` : ''}
                </div>
            </div>
            
            <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; flex: 1;">
                
                <div class="metric-card" style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 25px; text-align: center; border: 1px solid rgba(255,255,255,0.2); transition: transform 0.2s ease;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; color: #4CAF50;">${config.metrics.rendement}</div>
                    <div style="font-size: 1rem; opacity: 0.8;">Rendement</div>
                </div>
                
                <div class="metric-card" style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 25px; text-align: center; border: 1px solid rgba(255,255,255,0.2); transition: transform 0.2s ease;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; color: #2196F3;">${config.metrics.pieces}</div>
                    <div style="font-size: 1rem; opacity: 0.8;">Pièces/Heure</div>
                </div>
                
                <div class="metric-card" style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 25px; text-align: center; border: 1px solid rgba(255,255,255,0.2); transition: transform 0.2s ease;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; color: #4CAF50;">${config.metrics.qualite}</div>
                    <div style="font-size: 1rem; opacity: 0.8;">Qualité</div>
                </div>
                
                <div class="metric-card" style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 25px; text-align: center; border: 1px solid rgba(255,255,255,0.2); transition: transform 0.2s ease;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; color: #FF5722;">${config.metrics.defauts}</div>
                    <div style="font-size: 1rem; opacity: 0.8;">Défauts</div>
                </div>
                
                <div class="metric-card" style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 25px; text-align: center; border: 1px solid rgba(255,255,255,0.2); transition: transform 0.2s ease;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; color: #FF9800;">${config.metrics.temperature}</div>
                    <div style="font-size: 1rem; opacity: 0.8;">Température</div>
                </div>
                
                <div class="metric-card" style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 25px; text-align: center; border: 1px solid rgba(255,255,255,0.2); transition: transform 0.2s ease;">
                    <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; color: #9C27B0;">${config.metrics.etat}</div>
                    <div style="font-size: 1rem; opacity: 0.8;">État Machine</div>
                </div>
                
            </div>
        </div>
        
        <style>
            .metric-card:hover {
                transform: translateY(-5px);
                background: rgba(255,255,255,0.15) !important;
            }
        </style>
    `;
    
    modal.classList.add('show');
}

// 🔄 Supprimer les tentatives d'iframe inutiles
// Commentez ou supprimez loadGrafanaIframe, handleEmbedSuccess, handleEmbedError, etc.
















    fallbackToMockDashboard(zoneId) {
        console.log(`🔄 Basculement vers dashboard simulé pour ${zoneId}`);
        const config = ZONES_CONFIG[zoneId];
        
        // Réafficher le dashboard simulé
        const frame = document.getElementById('grafanaFrame');
        frame.innerHTML = `
            <div class="mock-dashboard">
                <div class="dashboard-header">
                    <h2 id="dashboardTitle">Métriques - ${config.title}</h2>
                    <div class="timestamp">Dernière mise à jour: <span id="lastUpdate"></span></div>
                </div>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value" id="metric1">${config.metrics.rendement}</div>
                        <div class="metric-label">Rendement</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="metric2">${config.metrics.pieces}</div>
                        <div class="metric-label">Pièces/Heure</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="metric3">${config.metrics.qualite}</div>
                        <div class="metric-label">Qualité</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="metric4">${config.metrics.defauts}</div>
                        <div class="metric-label">Défauts</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="metric5">${config.metrics.temperature}</div>
                        <div class="metric-label">Température</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="metric6">${config.metrics.etat}</div>
                        <div class="metric-label">État Machine</div>
                    </div>
                </div>
            </div>
        `;
        
        this.updateTimestamp();
    }

    updateMetrics(metrics) {
        const elements = {
            metric1: document.getElementById('metric1'),
            metric2: document.getElementById('metric2'),
            metric3: document.getElementById('metric3'),
            metric4: document.getElementById('metric4'),
            metric5: document.getElementById('metric5'),
            metric6: document.getElementById('metric6')
        };

        if (elements.metric1) elements.metric1.textContent = metrics.rendement;
        if (elements.metric2) elements.metric2.textContent = metrics.pieces;
        if (elements.metric3) elements.metric3.textContent = metrics.qualite;
        if (elements.metric4) elements.metric4.textContent = metrics.defauts;
        if (elements.metric5) elements.metric5.textContent = metrics.temperature;
        if (elements.metric6) elements.metric6.textContent = metrics.etat;
        
        this.updateTimestamp();
    }

    closeGrafana() {
        const modal = document.getElementById('grafanaModal');
        modal.classList.remove('show');
        console.log('❌ Modal Grafana fermé');
        
        // Nettoyer l'iframe après fermeture
        setTimeout(() => {
            const frame = document.getElementById('grafanaFrame');
            if (frame) {
                frame.innerHTML = '';
            }
        }, 300);
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
        const timeString = now.toLocaleString('fr-FR');
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
            console.log('📊 Mode simulation - pas de connexion API');
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
        const zones = Object.values(ZONES_CONFIG);
        const totalRendement = zones.reduce((sum, zone) => {
            return sum + parseFloat(zone.metrics.rendement);
        }, 0) / zones.length;
        
        const globalProd = document.getElementById('global-production');
        if (globalProd) {
            globalProd.textContent = `${Math.round(totalRendement)}%`;
        }
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

    // Fonction de debug
    debugInfo() {
        console.log('🔍 Debug Enterprise Map:', {
            grafanaEmbedded: APP_CONFIG.grafanaEmbedded,
            currentZone: this.currentZone,
            zone1GrafanaUrl: ZONES_CONFIG.moule1.grafanaUrl,
            allZones: Object.keys(ZONES_CONFIG)
        });
    }
}

// Fonctions globales
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

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.enterpriseMap = new EnterpriseMap();
    
    // Fonction de debug accessible globalement
    window.debugApp = () => window.enterpriseMap.debugInfo();
    
    console.log('✅ Application prête ! Tapez debugApp() pour voir les infos de débogage');
});