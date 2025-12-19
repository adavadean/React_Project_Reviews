# Product Review App (React + TypeScript + Mock API)

O aplicatie moderna construita cu **React**, **TypeScript**, **Vite** si un **Mock API Express**, care afiseaza o lista de produse, permite adaugarea de review-uri, filtrarea prin search si vizualizarea detaliilor fiecarui produs.

Proiectul este creat pentru a exersa:

- lucrul cu API-uri (GET, POST)
- gestionarea starii in React
- typing in TypeScript
- routing cu pagini dinamice
- stilizare moderna si responsive in 4 coloane

---

## Functionalitati

### Lista de produse

- afisata in **grid de 4 coloane**, responsive
- fiecare card contine:
  - poza produs
  - nume
  - descriere scurtata
  - rating mediu
  - numar review-uri
  - _Show more_ pentru descrieri lungi

### Cautare (Search)

- filtrare in timp real
- cauta dupa **nume** sau **descriere**

### Pagina detaliata

- imagine mare
- rating + nr. review-uri
- descriere completa
- lista cu toate review-urile
- buton _Back to products_ modern

### Review-uri

- afisare review-uri existente
- _Show more / Show less_ pentru comentarii lungi
- adaugare review nou cu validare:
  - rating obligatoriu
  - text obligatoriu
  - mesaje de eroare
  - mesaj de succes

---

## Tehnologii folosite

### Frontend

- React 18
- TypeScript
- Vite
- React Router v6
- CSS impartit pe module (base, layout, product-card, detail, reviews, form)

### Backend (Mock API)

- Node.js
- Express
- products.json

Rute:

- `GET /products`
- `POST /products/:id/reviews`

---

## Structura proiect

```
REACT_PROJECT/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── package.json
│
└── rw-api-main/
    ├── src/server.js
    ├── products.json
    └── package.json
```

---

## Cum rulezi proiectul

### Backend (API)

```
cd rw-api-main
npm install
npm start
```

### Frontend (React)

```
cd frontend
npm install
npm run dev
```

---
