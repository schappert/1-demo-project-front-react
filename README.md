# Projet Démo - Gestion Users / Tasks

## Principes généraux de cette application de démo: React Query et Redux

### ⚛️ React Query
Pour toutes les données venant du backend à synchroniser facilement (Users et Tasks).

**Avantages :**
- 🗂️ Cache intégré
- 🔄 Invalidation automatique
- ⏱️ Refetch automatique
- ⚠️ Gestion des états `loading` / `error`

---

### 🛠️ Redux
Pour les états locaux ou transitoires qui ne nécessitent pas de sauvegarde immédiate dans le backend  
(exemple : sélection de tâches pour un utilisateur avant validation).

**Avantages :**
- 👀 Prévisualisation des changements
- 🔗 Partage d'état entre plusieurs composants
- ↩️ Possibilité de `undo` / `redo`

---

### 📝 Synthèse

| Ressource       | Gestion                     | Remarques                                                              |
|-----------------|----------------------------|------------------------------------------------------------------------|
| **Users**       | React Query                | Lecture/écriture directe sur le backend                                 |
| **Tasks**       | React Query                | Lecture/écriture directe sur le backend                                 |
| **Assignments** | Redux (local) → React Query | Gestion temporaire côté frontend, puis mutation pour sauvegarde backend |

---

## 🔐 Gestion sécurisée des tokens JWT

### 💡 Principe

L’authentification utilise **Access Token** et **Refresh Token**, stockés dans **cookies sécurisés `HttpOnly`**.  
Cela empêche le code JavaScript du frontend de les lire, protégeant contre le **vol de token via XSS**.

- **Access Token** : valide 15 minutes, utilisé pour authentifier les requêtes au backend.
- **Refresh Token** : valide 7 jours, permet de générer un nouveau Access Token sans forcer l’utilisateur à se reconnecter.

### 🎯 Mitigation XSS

- Stockage uniquement dans **cookies HttpOnly**, donc **inaccessible via JavaScript**.
- Évite que des scripts injectés via XSS puissent récupérer le token.

### 🔁 Mitigation CSRF

- Cookies définis avec `SameSite=Strict` : ils ne sont envoyés que pour les requêtes **depuis ton propre domaine**.
- Cookies `Secure` : envoyés uniquement en HTTPS.
- Résultat : protection contre les attaques **Cross-Site Request Forgery**.

### 📦 Workflow côté front

1. L’utilisateur se connecte → backend renvoie Access & Refresh Token dans des cookies sécurisés.
2. Les requêtes vers le backend envoient automatiquement le cookie `HttpOnly`.
3. Si l’Access Token expire → frontend appelle `/auth/refresh` pour obtenir un nouveau Access Token.
4. Le cookie Refresh Token est renouvelé automatiquement si valide.

### 🔍 Résumé

| Token          | Stockage      | Durée   | Usage principal                   |
|----------------|---------------|---------|----------------------------------|
| **Access**     | Cookie HttpOnly | 15 min | Authentification requêtes API    |
| **Refresh**    | Cookie HttpOnly | 7 jours | Génération d’un nouvel access token |

---

## Installation et setup

```bash
# Installer les dépendances
npm install

# Lancer le backend en mode dev
npm run start:dev
