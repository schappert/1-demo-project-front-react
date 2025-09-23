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

| Ressource    | Gestion           | Remarques                                                                 |
|-------------|-----------------|--------------------------------------------------------------------------|
| **Users**    | React Query      | Lecture/écriture directe sur le backend                                   |
| **Tasks**    | React Query      | Lecture/écriture directe sur le backend                                   |
| **Assignments** | Redux (local) → React Query | Gestion temporaire côté frontend, puis mutation pour sauvegarde backend |
