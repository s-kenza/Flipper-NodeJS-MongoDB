# Examen NodeJs & MongoDB 🔥- Ts

_Copy .env.example to a .env file_
  

-  `npm install`
-  `npm run dev`

## Proposition de modèle
**marques**
 ```js   
 db.marques.insertMany(
    [
        {_id: 1, name: "Stern Pinball"},
        {_id: 2, name: "Bally"}, 
        {_id: 3, name: "Gottlieb"}, 
        {_id: 4, name: "Williams"},
        {_id: 5, name: "Data East"}, 
        {_id: 6, name: "Sega"}, 
        {_id: 7, name: "Jersey Jack Pinball"}
    ]
);
```
## Pourquoi ce modèle ?

- **Normalisation** : En séparant les marques dans une collection distincte, on supprime la redondance des informations pour faciliter la gestion des données (ajout, modification, suppression de marques).
- **Référencement** : Les flippers peuvent référencer les marques via des relations, donc une meilleure intégrité des données pour simplifier les requêtes.

**flippers**
 ```js  
 db.flippers.insertMany(
    [
        { 
            name: "John Wick Limited Edition (LE)", 
            price: 16500, 
            stock: 5, 
            state: "new", 
            date: new Date("2024-01-01"), 
            note: 4.4, 
            images: [
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg",
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg",
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg"
            ], 
            brand: { _id: 1, name: "Stern Pinball"}
        },
        { 
            name: "Revenge from Mars", 
            price: 2600, 
            stock: 1, 
            state: "", 
            date: new Date("1998-01-01"), 
            note: 3.5, 
            images: [
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg",
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg",
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg"
            ], 
            brand: {_id: 2, name: "Bally"}
        }, 
        { 
            name: "Barb Wire", 
            price: 2600, 
            stock: 0, 
            state: "", 
            date: new Date("1996-01-01"), 
            note: 3.5, 
            images: [
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg",
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg",
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg"
            ], 
            brand: {_id: 3, name: "Gottlieb"}
        }, 
        { 
            name: "Star Wars Episode 1", 
            price: 2600, 
            stock: 0, 
            state: "", 
            date: new Date("1999-01-01"), 
            note: 3.8, 
            images: [
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg",
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg",
                "https://www.lyon-flipper.com/images/f/e/a/t/u/featured-flipper-stern-pinaball-john-wick-limited-edition-3-81676a87.jpg"
            ], 
            brand: {_id: 4, name: "Williams"}
        }
    ]
);

```
## Pourquoi ce modèle ?

- Chaque flipper contient toutes les informations nécessaires, y compris les détails de la marque. Cela facilite l'accès et l'affichage des données.
- **Images Multiples** : En utilisant un tableau pour les URLs des images, on peut stocker plusieurs images pour chaque flipper, ce qui est utile pour les fiches produits détaillées.
- **Structure Flexible** : La structure de MongoDB permet d'ajouter facilement de nouveaux champs à chaque flipper sans affecter les autres documents.

# Justification Modélisation
- Marques : Les marques sont isolées dans une collection distincte (marques) avec un identifiant unique (_id) et un nom. On évite donc la redondance et la répétition des détails de marque dans chaque objet flipper.
- Flippers : Chaque objet flipper contient des informations spécifiques à chaque machine, y compris une référence à la marque via un champ de type objet. Cela facilite la gestion des données et permet une mise à jour centralisée des informations de la marque.

- La structure des objets flipper permet d'ajouter facilement de nouveaux champs ou de modifier les existants sans impacter les autres documents. Par exemple, l'ajout de nouveaux attributs comme des champs personnalisés ou des références supplémentaires peut se faire sans altérer le schéma global.
- L'utilisation de références (via l'id des marques) permet l'intégrité des données sans incohérences à cause de données qui seraient duppliquées.

# Optimisation
## Optimisation 1 : Améliorer le Search par Nom de Flipper
En créant un index texte sur le champ name, on peut améliorer la vitesse des recherches par nom de flipper.
```js
db.flippers.createIndex({ name: "text" });
```

- Les index textes permettent une recherche rapide et efficace sur des champs textuels.
- MongoDB utilisera l'index texte pour optimiser les requêtes de recherche.

```js
db.flippers.find({ $text: { $search: "John Wick" } });
```

## Optimisation 2 : Accélérer la Présentation en Liste des Flippers sur la Home Page
Il faut créer un index sur `name`, `price`, `brand._id`, `stock`
```js
db.flippers.createIndex({ name: 1, price: 1, "brand._id": 1, stock: 1 });
```

- Vu que ce sont des index composés, les opérations de tri et de filtrage sont plus performants.
- Les requêtes qui sélectionnent plusieurs champs utilisés dans l'index composé seront aussi plus rapides et efficaces.

```js
db.flippers.find({}, { name: 1, price: 1, "brand.name": 1, stock: 1 }).sort({ price: -1 }).limit(10);
```