# Oursa.ch

Site statique Oursa.ch prêt pour GitHub Pages.

## Déploiement GitHub Pages

1. Créer un repository GitHub dédié, par exemple `oursa`.
2. Mettre les fichiers de ce dossier à la racine du repository.
3. Dans GitHub : `Settings` -> `Pages`.
4. Choisir `Deploy from a branch`.
5. Sélectionner la branche `main` et le dossier `/root`.
6. Sauvegarder.

GitHub Pages servira automatiquement `index.html`.

## Fichiers principaux

- `index.html` : page publiée par GitHub Pages.
- `furets-inspired.css` : styles du site et responsive.
- `script.js` : interactions, night mode et animation des cartes.
- `.nojekyll` : évite le traitement Jekyll de GitHub Pages.

## Domaine personnalisé

Pour publier sur `oursa.ch`, ajouter le domaine dans GitHub Pages puis configurer les DNS chez le registrar. Ne pas ajouter de fichier `CNAME` avant que le domaine soit prêt côté DNS.
