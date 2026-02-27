# Plan de commits (SemVer) — activité CI/CD & NPM

Ce fichier sert à produire **l’historique Git + Actions** demandé dans la fiche.

> Objectif : 3 publications NPM (patch/minor/major) + 1 run où `publish-npm` est **skippé** (README only).

---

## Pré-requis (1 fois)

1. Sur GitHub : `Settings → Secrets and variables → Actions → New repository secret`
   - **Name**: `NPM_TOKEN`
   - **Value**: votre token NPM (Automation/Publish)

2. Vérifier le nom du package (dans `app/package.json`)
   - Si `test-cycle-tdd-person-form` est déjà pris, utilisez un scope :
     - `@votre-scope/test-cycle-tdd-person-form`
   - Puis adaptez le README.

---

## Commit A — PATCH (1.0.0 → 1.0.1)

### Idée de changement (non cassant)
- Corriger un libellé / message de validation / typo
- Exemple : ajuster un message d’erreur dans `PersonForm`

### Actions
- Incrémenter la version dans `app/package.json` : `1.0.0` → `1.0.1`

### Message de commit conseillé
`fix(person-form): correct minor validation message (patch)`

---

## Commit B — MINOR (1.0.1 → 1.1.0)

### Idée de changement (rétrocompatible)
- Ajouter une prop **optionnelle** avec valeur par défaut
- Exemple : `submitLabel?: string` (défaut: "Ajouter")

### Actions
- Modifier `PersonForm` pour accepter `submitLabel` (sans casser l’existant)
- Incrémenter la version : `1.0.1` → `1.1.0`

### Message de commit conseillé
`feat(person-form): add optional submitLabel prop (minor)`

---

## Commit C — MAJOR (1.1.0 → 2.0.0)

### Idée de changement (cassant)
- Renommer une prop publique utilisée par les consommateurs
- Exemple : `addPerson` → `onSubmit`

### Actions
- Mettre à jour le composant + tests si besoin
- Incrémenter la version : `1.1.0` → `2.0.0`

### Message de commit conseillé
`feat!(person-form): rename addPerson prop to onSubmit (major)`

---

## Commit D — SKIP (README only)

### Actions
- Modifier **uniquement** `README.md` (texte), **sans changer** `app/package.json`

### Résultat attendu
- `build-and-test` OK
- `publish-npm` **bypassed/skip**
- `deploy` s’exécute quand même

### Message de commit conseillé
`docs(readme): update documentation (should skip publish)`

---

## Preuves à récupérer pour la note

- GitHub Actions : captures des 4 runs (au moins les logs de `publish-npm`)
- NPM : page du package montrant les versions publiées : `1.0.0`, `1.0.1`, `1.1.0`, `2.0.0`
