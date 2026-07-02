# E-Commerce Frontend

React e-commerce app with authentication, product catalog, shopping cart, and checkout. Uses [Fake Store API](https://fakestoreapi.com) for auth, products, and cart submission.

## Live demo

_Add your Vercel URL here after deploy._

## Features

- JWT authentication (login / logout, protected routes)
- Product listing with search and category filter
- Product details
- Shopping cart (add, remove, update quantity)
- Checkout flow with order confirmation
- Dashboard with per-user stats
- REST API integration via Axios

## Tech stack

- React 19 + TypeScript
- Vite
- React Router
- Context API (auth + cart)
- Axios
- Fake Store API

## Demo login

| Username | Password |
|----------|----------|
| `johnd` | `m38rmF$` |

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

Optional: copy `.env.example` to `.env` to override the API URL (defaults to `https://fakestoreapi.com`).

```bash
npm run build   # production build
npm run preview # preview production build locally
```

## Project structure

```
src/
├── api/          # Axios client + Fake Store endpoints
├── context/      # AuthContext, CartContext
├── components/   # UI, layout, ProtectedRoute
├── pages/        # Route pages
└── utils/        # Token, cart storage, checkout history
```

## Deployment

Configured for [Vercel](https://vercel.com) with SPA routing (`vercel.json`). Connect the GitHub repo and deploy the `development` branch.

Build settings (auto-detected for Vite):

- **Build command:** `npm run build`
- **Output directory:** `dist`

No environment variables required — the app defaults to Fake Store API.
