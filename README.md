# Site Nexus sur GitHub Pages

Ce dépôt publie le site Nexus sur le domaine personnalisé `pagemaker.me`.

## Structure

- `CNAME` : domaine custom GitHub Pages.
- `nexus/` : projet source importé.
- `nexus/dist/` : build statique publié.

## Déploiement automatique

Le workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publie automatiquement sur GitHub Pages à chaque push sur la branche `nexus`.

Le pipeline :

1. Copie `nexus/dist` dans un artefact `_site`.
2. Copie `CNAME` dans l'artefact pour conserver le domaine.
3. Crée `404.html` depuis `index.html` pour le fallback SPA React Router.
4. Déploie l'artefact vers GitHub Pages.

## Validation CI

Le workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) vérifie :

- présence de `CNAME`;
- présence de `nexus/dist/index.html`;
- présence du dossier `nexus/dist/assets`;
- présence des marqueurs SPA dans le build.

## Publication du contenu Nexus

Si le contenu de `nexus/dist/` change, pousse simplement sur la branche `nexus`.
Le déploiement démarre automatiquement.

## Compatibilité de routage

GitHub Pages ne gère pas nativement le fallback SPA. Le déploiement génère `404.html` à partir de `index.html` pour que les accès directs aux routes retournent l'application au lieu d'une erreur 404.