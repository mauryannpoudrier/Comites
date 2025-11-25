# Comités Ville de Val-d’Or

Interface web pour suivre les sujets des comités **CCC / CCSRM** et **CCU** de la Ville de Val-d’Or. L’application est prête à être déployée sur Firebase Hosting et prévoit un branchement ultérieur à Firestore pour la synchronisation des données.

## Fonctionnalités principales
- Page d’accueil en français avec un style sobre et professionnel.
- Séparation claire des sujets CCC / CCSRM et CCU, triés par séance (numéro + date) avec liens vers PV et ordre du jour en PDF.
- Filtres rapides : comité, catégories, mots-clés, numéros de résolution/commentaire et recherche cartographique.
- Gestion des catégories (ajout/suppression) et formulaires pour créer des séances et des sujets (avec résolutions liées, commentaires, catégories, mots-clés et lien vers PV/ODJ).
- Cartographie rapide via OpenStreetMap/Leaflet pour localiser les sujets (ex. intersections) et voir les regroupements.
- Stockage local immédiat (localStorage) avec bouton « Synchroniser » prévu pour Firestore.

## Prérequis
- Node.js 18+ et npm.
- Accès au registre npm pour installer les dépendances (réseaux restreints : configurez votre proxy si nécessaire).

## Installation
```bash
npm install
```

Si le registre npm est bloqué, définissez les variables d’environnement `HTTPS_PROXY`/`https_proxy` ou configurez `.npmrc` selon votre réseau, puis relancez `npm install`.

## Démarrage et build
```bash
npm run dev      # lance Vite en mode développement
npm run build    # compile le bundle de production
npm run preview  # sert le bundle après build
```

## Configuration Firebase Hosting
1. Créez un projet Firebase et activez Hosting (+ Firestore si souhaité).
2. Dans ce dépôt, installez l’outil CLI si nécessaire : `npm install -g firebase-tools`.
3. Initialisez le hosting : `firebase login` puis `firebase init hosting` (dossier public : `dist`, commande de build : `npm run build`).
4. Déployez : `npm run build && firebase deploy`.

Pour Firestore, ajoutez un fichier `src/firebase.ts` avec votre configuration et remplacez la logique de `localStorage` par des appels CRUD (collections `sessions`, `topics`, `categories`). Le bouton « Synchroniser » est prévu pour déclencher ces appels.

## Données de démonstration
Les données initiales (catégories, séances, sujets, coordonnées) se trouvent dans `src/data/demoData.ts`. Elles sont chargées au premier lancement puis stockées dans `localStorage`. Vous pouvez les remplacer par vos données réelles.

## Structure du code
- `src/App.tsx` : composition principale et gestion des filtres / stockage local.
- `src/components/` : filtres, formulaires, tableau des séances, carte, synchronisation.
- `src/data/` : données de démonstration.
- `src/styles/` : thème global et styles de page.

## Accessibilité et collaboration
- Interface tout en français, boutons et libellés clairs.
- Ciblé pour un usage partagé en équipe (droits en lecture seule à prévoir côté Firebase Auth/Rules ultérieurement).
