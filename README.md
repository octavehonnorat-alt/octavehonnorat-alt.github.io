# Site pagemaker.me

Ce dépôt héberge le site **pagemaker.me** avec **Vite** + **GitHub Pages**.

## Développement local

```bash
npm install
npm run dev
```

## Build local

```bash
npm run build
```

Le build est généré dans `dist/`.

## Déploiement automatique (GitHub Pages)

Le workflow `.github/workflows/deploy-pages.yml` :

1. installe les dépendances (`npm ci`)
2. build le site (`npm run build`)
3. copie `CNAME` dans `dist/`
4. copie `index.html` vers `404.html` (fallback SPA)
5. déploie `dist/` sur GitHub Pages

## Domaine personnalisé pagemaker.me

Le fichier `CNAME` contient déjà :

```
pagemaker.me
```

À configurer côté DNS du domaine :

- `A` vers `185.199.108.153`
- `A` vers `185.199.109.153`
- `A` vers `185.199.110.153`
- `A` vers `185.199.111.153`
- (optionnel) `AAAA` vers les IPv6 GitHub Pages
