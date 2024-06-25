# Static Rendering

### 💡 Comprendre le rendu Statique

## 📝 Tes notes

Detaille ce que tu as appris ici, sur une page [Notion](https://go.mikecodeur.com/course-notes-template)

## Comprendre

Dans le cadre de Next.js, les React Server Components offrent une approche puissante pour la création d'interfaces utilisateur.

**Cette technologie permet de réaliser le rendu des composants directement sur le serveur.**

Une des particularités de Next.js est qu'il divise encore plus le travail de rendu par segments de route, facilitant ainsi le streaming et le rendu partiel des composants.

Il existe **trois stratégies de rendu côté serveur** distinctes que vous découvrirez au fil de ce module.

- Rendu statique
- Rendu dynamique
- Streaming

Chacune de ces stratégies offre des avantages spécifiques en termes de performance et de gestion des ressources, que nous allons explorer ensemble.

<aside>
💡 Rappel sur les Avantages des RSC :

</aside>

- **Récupération de Données** : Déplace la récupération de données vers le serveur pour améliorer les performances.
- **Sécurité** : Maintient les données sensibles et la logique sur le serveur, évitant toute exposition au client.
- **Mise en Cache** : Permet la mise en cache du rendu pour réutilisation, réduisant les coûts et améliorant la rapidité.
- **Performance** : Optimise l'usage du JavaScript côté client, bénéfique pour les utilisateurs avec des connexions lentes ou des appareils moins puissants.
- **Chargement Initial de la Page ([FCP](https://web.dev/articles/fcp?hl=fr))** : Génère du HTML sur le serveur pour un affichage immédiat, sans attendre le JavaScript client.
- **SEO et Partage sur les Réseaux Sociaux** : Utilise le HTML rendu pour l'indexation par les moteurs de recherche et la création de prévisualisations pour les réseaux sociaux.
- **Streaming** : Divise le travail de rendu en morceaux qui sont envoyés au client dès qu'ils sont prêts, accélérant la visualisation.

**La première stratégie est le rendu statique :**

C’est la stratégie par default de Next. Cette stratégie consiste à générer le rendu de chaque route au `“build time”` c’est à dire lors [de la compilation](https://nextjs.org/docs/architecture/nextjs-compiler) ou après `une demande de revalidation` .

En tant que développeur il vaut avoir conscience que le comportement ne notre application peut être impacté selon que nous soyons en mode développement (`'pnpm dev'`)ou en mode production (’`pnpm build`’ / ‘`pnpm start`’)

Afin de nous aider dans les exercices nous avons un composant `env-component.tsx` qui détecte dans quel environnement nous sommes pour éviter les incompréhensions. Il utilise :

```tsx
const environment = process.env.NODE_ENV
```

Nous avons également un composent `<RenderTime />` qui nous donne 3 types d’informations

- Si le composant est un RCC ou RSC
- L’environnement (Dev ou Prod)
- L’heure du rendu de la page

```tsx
<RenderTime />
//Server component (Env: development) Rendu le 2024-06-25T08:13:29.956Z
```

- Impact du HMR (Hot Module Reload) en mode DEV.

Le HMR détecte tout changement de fichier dans le projet, il `rebuild` et régénère le content. C’est pour cela qu’il faut tester le comportement en mode “production” .

## Exercice

🐶 Dans cet exercice tu vas devoir afficher un segment de route statique. Cela est le comportement par default d’un React Server Component avec Next.

Dans la route `/exercise/static-rendering` il va falloir faire un appel à un source de données.

```tsx
import {getPosts} from '@/db/sgbd'
//...
getPosts()
```

Et afficher ces post statiquement sur cette route. Pour vérifier que le comportement est correcte, tu peux modifier la source de données en ajoutant ou modifiant des `Posts` par exemple. Comme nous sommes en statique, le contenu ne devrait plus être modifié à l’ecran

```tsx
//src/db/db.json
//Modifier les postes en BDD pour tester le comportement
"posts": [
    {
      "id": "1",
      "title": "Default post"
    },
    {
      "id": "2",
      "title": "Un post"
    }
  ],
```

Ce mode de fonctionnement ressemble à un système de cache (infini) car on accède une seule fois à la source de données. Ces données peuvent ensuite être dispatcher a plusieurs serveurs CDN

Fichiers

- `exercise/static-rendering/page.tsx`

## Bonus

### 1. 🚀 Revalidation

Le routes statiques peuvent être regénérées [en se basant sur le temps](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data)

```tsx
export const revalidate = 3600 // revalidate at most every hour
```

ou [manuellement](https://www.notion.so/Static-Rendering-b518ffb87d1241d9b7faa9984b54d1f9?pvs=21)

Les données peuvent être revalidées à la demande par chemin (`revalidatePath`) ou par balise de cache (`revalidateTag`) dans une action serveur ou un gestionnaire de route. exemple

```tsx
'use server'

import { revalidateTag } from 'next/cache'

export default async function action() {
  revalidateTag('collection')
}
```

**🐶** Dans cet exercice tu vas devoir faire une revalidation toutes les 10 secondes. Pour tester modifie le fichier de base de données

Fichiers

- `exercise/static-rendering/page.tsx`

###

## Aller plus loin

📑 Static Rendering : [https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)

📑 Le lien vers la doc revalidation [https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data)

## Ils vont t’aider

- **🐶 Mowgli le Chien** : _Mowgli te guidera dans chaque exercice._
- **🤖 Ash le Robot** : _Ash le Robot te donnera du code utile._
- **🚀 Julia La roquette** : _Julia te donnera des défis supplémentaires._
- **⛏️ Hulk le Marteau** : _Quand du code à supprimer est présent_
- **👨‍✈️ Hugo le chef de projet** : _Va t'aider sur les spécifications du projet_

## 🐜 Feedback

Remplir le formulaire le [formulaire de FeedBack](https://go.mikecodeur.com/cours-next-avis?entry.1912869708=Next%20PRO&entry.1430994900=Rendering%20Avancée&entry.533578441=01%20Static%20Rendering).
