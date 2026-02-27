# test-cycle-tdd-person-form

Bibliothèque React (issue de ce projet) qui expose le composant **PersonForm**.

## Installation !!

```bash
npm i test-cycle-tdd-person-form
```

## Utilisation

```jsx
import React from 'react';
import { PersonForm } from 'test-cycle-tdd-person-form';

export default function Example() {
  const addPerson = async (person) => {
    // ...votre logique (API / state)
    console.log(person);
  };

  return <PersonForm addPerson={addPerson} />;
}
```

> Remarque : le composant importe du CSS. Assurez-vous que votre bundler (Vite/Webpack) gère les imports CSS.
