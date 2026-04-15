# Site sur GitHub Pages

Ce dépôt publie le site sur le domaine personnalisé `pagemaker.me`.

## Structure

- `CNAME` : domaine custom GitHub Pages.
- racine du dépôt : fichiers source du site.
- `dist/` : build statique généré pour la publication.

## Déploiement automatique

Le workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publie automatiquement sur GitHub Pages à chaque push sur la branche `nexus`.

Le pipeline :

1. Installe les dépendances et génère le build `dist/`.
2. Copie `CNAME` dans l'artefact pour conserver le domaine.
3. Crée `404.html` depuis `index.html` pour le fallback SPA.
4. Déploie l'artefact vers GitHub Pages.

## Validation CI

Le workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) vérifie :

- présence de `CNAME`;
- présence de `dist/index.html`;
- présence du dossier `dist/assets`;
- présence des marqueurs SPA dans le build.

## Publication du contenu

Pousse simplement les changements sur la branche `nexus`.
Le déploiement démarre automatiquement.

## Compatibilité de routage

GitHub Pages ne gère pas nativement le fallback SPA. Le déploiement génère `404.html` à partir de `index.html` pour que les accès directs aux routes retournent l'application au lieu d'une erreur 404.
