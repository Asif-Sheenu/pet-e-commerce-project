## Pawfect — Pet Food E-Commerce (Frontend) 

Pawfect is a clean, responsive React frontend for a pet food e-commerce experience. This repo is part of my learning journey in React — a hands-on project to master component design, state management, routing, and UX patterns while simulating a backend with a db.json.

## Table of Contents

1.About

2.Key Features

3.Tech Stack

4.Quick Demo / Screenshots

5.Getting Started (install & run)

6.Project Structure

7.Contact

## 1. About

Pawfect is a frontend-focused pet food e-commerce site built in React. It showcases modern React patterns (Hooks, component composition, client routing) and demonstrates product listing, search & filters, cart flows, and responsive UI. The backend is simulated using a local db.json to keep the project lightweight for frontend learning and demos.

## 2. Key Features

🌟 Product listing with images, price, and category

🔎 Search + filter by category & price

🛒 Add to cart / cart management + quantity update

📦 Product detail page with rich info

📱 Responsive design — mobile & desktop friendly

🧪 Mock backend using db.json (easy to swap with real API)

⚡ Clean, reusable components and readable folder structure

## 3. Tech Stack

React (functional components & Hooks)

React Router for client-side routing

Context for global state 

json-server for local mock API (db.json)

Tailwind Styled-Components 

Build tools: Vite / Create React App 

## 4. Quick Demo / Screenshots

![Homepage Screenshot](src/assets/screenShots/adminDashboard.gif)
![Product Page](./assets/screenShots/products.png)
![Order Confirmation Page](./assets/screenShots/orderconfirmation.png)
![Admin Dashboard ](./assets/screenShots/adminDashboard.gif)

## 5. Getting Started
Prerequisites

Node.js (v16+)

npm or yarn

Install & Run
 clone repo
git clone https://github.com/<your-username>/pawfect.git
cd pawfect

 install
npm install
 or
yarn

 run simulated backend (see next section)
npm run server

 run frontend
npm start
 or with yarn
yarn start


Open http://localhost:3000 (or the port your dev server logs) to view.

## 6. Project Structure

```
└── 📁src
    └── 📁adminpage
        ├── admin.jsx
        ├── adminlayout.jsx
        ├── orderadmin.jsx
        ├── productadmin.jsx
        ├── usersadmin.jsx
    └── 📁assets
        ├── react.svg
    └── 📁Project
        └── 📁HOME
            ├── bestsellinddogs.jsx
            ├── catanddog.jsx
            ├── categories.jsx
            ├── footer.jsx
            ├── homepage.jsx
            ├── login2.jsx
            ├── mag.jsx
            ├── mid.jsx
            ├── navbar.jsx
            ├── newnavbar.jsx
            ├── ourservice.jsx
            ├── signup.jsx
        ├── allproducts.jsx
        ├── cartcontest.jsx
        ├── dogs.jsx
        ├── mainCart.jsx
        ├── order.jsx
        ├── orderlist.jsx
        ├── payment.jsx
        ├── productdetail.jsx
    ├── App.css
    ├── App.jsx
    ├── guestroute.jsx
    ├── index.css
    ├── main.jsx
    └── protect.jsx
```

## 7. Contact

Asif — aspiring full-stack dev 

GitHub: https://github.com/Asif-Sheenu

Email: asifssheenu@gmail.com

linkedin : https://www.linkedin.com/in/asif-s-sheenu-/

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
