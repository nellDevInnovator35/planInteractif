# Application Carte Interactive d'Entreprise

## Installation

1. **Téléchargez les fichiers** dans un dossier `enterprise-map/`
2. **Configurez vos dashboards Grafana** dans `config/zones-config.js`
3. **Hébergez sur un serveur web** (Apache, Nginx, ou serveur de développement)

## Configuration Grafana

### Remplacer les URLs mockées
Dans `config/zones-config.js`, remplacez les URLs par vos vrais dashboards :

```javascript
grafanaUrl: 'https://votre-grafana.com/d/dashboard-id/nom-dashboard?orgId=1&refresh=5s'