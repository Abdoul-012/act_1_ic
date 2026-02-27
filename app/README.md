# @abdouleexz/test-cycle-tdd-person-form

Bibliothèque React (issue de ce projet) qui expose le composant **PersonForm**.

## Installation

```bash
npm i @abdouleexz/test-cycle-tdd-person-form
```

## Utilisation

> ⚠️ API actuelle (MAJOR) : la prop **`addPerson`** a été renommée en **`onSubmit`**.

```jsx
import React from "react";
import { PersonForm } from "@abdouleexz/test-cycle-tdd-person-form";

export default function Example() {
  const onSubmit = async (person) => {
    // ...votre logique (API / state)
    console.log(person);
  };

  return <PersonForm onSubmit={onSubmit} />;
}
```

## Props

### `onSubmit` (obligatoire)

Fonction appelée quand le formulaire est valide.

```jsx
<PersonForm onSubmit={async (person) => console.log(person)} />
```

### `submitLabel` (optionnel)

Permet de personnaliser le texte du bouton (valeur par défaut : `"Soumettre"`).

```jsx
<PersonForm onSubmit={onSubmit} submitLabel="Créer le compte" />
```

## Notes

- Le composant importe du **CSS**. Assurez-vous que votre bundler (Vite/Webpack) gère les imports CSS.
- Le formulaire gère des validations (nom, email, âge, ville, code postal…) et affiche les erreurs.
- Les notifications de succès/erreur utilisent **react-toastify**.

## Liens

- Page NPM (profil) : https://www.npmjs.com/~abdouleexz
- Package NPM : https://www.npmjs.com/package/@abdouleexz/test-cycle-tdd-person-form
- Repo (GitHub Actions) : https://github.com/Abdoul-012/act_1_ic/actions
