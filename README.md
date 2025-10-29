## Principes généraux de cette application de démo : React Query et Redux

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
(exemple : sélection de tâches pour un utilisateur avant validation).

**Avantages :**
- 👀 Prévisualisation des changements
- 🔗 Partage d'état entre plusieurs composants
- ↩️ Possibilité de `undo` / `redo`

---

### 📝 Synthèse

| Ressource        | Gestion                        | Remarques |
|-----------------|-------------------------------|-----------|
| **Users**        | React Query                   | Lecture/écriture directe sur le backend |
| **Tasks**        | React Query                   | Lecture/écriture directe sur le backend |
| **Assignments**  | Redux (local) → React Query   | Gestion temporaire côté frontend, puis mutation pour sauvegarde backend |

---

## 🔐 Gestion de l’authentification & sécurité

L’authentification s’appuie sur un système **Access Token + Refresh Token** conforme aux bonnes pratiques actuelles de sécurité web (OWASP).

### 📌 Stockage sécurisé des tokens

| Élément | Type | Stockage | Durée | Rôle |
|--------|------|----------|-------|-----|
| **Access Token** | JWT | ✅ Cookie HTTPOnly | ⏱️ 15 minutes | Autoriser l’accès aux routes protégées |
| **Refresh Token** | JWT | ✅ Cookie HTTPOnly + Secure + SameSite | 🗓️ 7 jours | Renouvellement du token d’accès sans reconnecter l’utilisateur |

✅ Aucune donnée sensible en localStorage → mitigation XSS  
✅ Cookies sécurisés → mitigation CSRF  
✅ Rotation automatique des refresh tokens → réduction du risque en cas de vol

---

### 🔁 Renouvellement automatique du token (`Silent Refresh`)

1. L’Access Token expire → réponse **401**
2. Le frontend appelle `/auth/refresh` via un intercepteur Axios
3. Le backend vérifie et renouvelle les tokens
4. L’utilisateur reste connecté de manière transparente ✅
5. En cas d’échec → redirection vers `/login`

---

### ✅ Avantages fonctionnels

- 🔒 Sécurité moderne et alignée sur les standards du marché
- ⚡ Expérience utilisateur fluide : pas besoin de se reconnecter fréquemment
- 🚫 Forte protection contre les attaques XSS / CSRF

---
