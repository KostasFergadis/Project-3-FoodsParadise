# Project_3 Frontend

React + Vite client for Foods Paradise.

## Scripts

- `npm install` to install dependencies
- `npm run dev` run the development server
- `npm run build` to create a build directory
- `npm run preview` to preview the production build

## Configuration

The API address defaults to `http://localhost:2002` in development and the deployed API in production. To change it, copy `.env.example` to `.env` and set `VITE_API_URL`. Values in this file end up in the public bundle, so never put secrets in it.

Remember to add the dev server's address (for example `http://localhost:5173`) to `CORS_ORIGIN` in the backend `.env`.

## Structure

- `src/pages` one component per route (Home, Explore, FoodPage, MyList, Login, Register)
- `src/components` NavBar, Footer and FoodCard
- `src/hooks/useAuth.js` shared login state and logout
- `src/styling` Sass files. `base.scss` holds the colour, spacing and font tokens; each page has its own file

This project was bootstrapped with **Create React Vite** using **React** as a framework and **JavaScript** as a variant.
