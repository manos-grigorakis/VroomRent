# VroomRent

VroomRent is a modern car rental web application that allows users to browse, filter, and rent vehicles from various providers. Built using Vue 3 for the frontend and Node.js with Express.js for the backend.

**[Live Demo](https://vroomrent.manosgrigorakis.com)**

## Features

- Browse and filter for available cars
- Book a rental with a simple and intuitive process
- Secure user authentication
- Secure transactions with Stripe
- Responsive design

## Tech Stack

- **Frontend:** Vue 3, JavaScript, Tailwind CSS, Vuex Store
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Prerequisites

- Node.js (v16+)
- MongoDB
- Stripe API Key
- (Optional) Stripe CLI

## Setup

1. Clone the repository

   ```bash
   git clone https://github.com/manos-grigorakis/VroomRent.git
   ```

2. Copy and configure environment variables

   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

3. Install backend dependencies

   ```bash
   cd backend && npm install
   ```

4. Install frontend dependencies

   ```bash
   cd frontend && npm install
   ```

5. Start backend server

   ```bash
   cd backend && node server.js
   ```

6. Start frontend

   ```bash
   cd frontend && npm run dev
   ```

## Screenshots

### Hero Section

![Hero Section](/docs/screenshots/hero-section.webp)

### Vehicle Selection Page

![Vehicle Selection Page](/docs/screenshots/vehicle-selection-page.webp)

### Extras Page

![Extras Page](/docs/screenshots/extras-page.webp)

### Checkout Form Page

![Checkout Form Page](/docs/screenshots/checkout-form-page.webp)
