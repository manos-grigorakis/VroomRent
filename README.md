# VroomRent

VroomRent is a modern car rental web application that allows users to browse, filter, and rent vehicles from various providers. Built using Vue.js for the frontend and Node.js with Express.js for the backend.

## Features

- Browse and filter for available cars
- Book a rental with a simple and intuitive process
- Secure user authentication
- Secure transactions with Stripe
- Responsive design

## Tech Stack

- **Frontend:** Vue.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Installation & Setup

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v16+)
- MongoDB (Cloud)
- Stripe API Key

### Clone the Repository

```bash
git clone https://github.com/manos-grigorakis/VroomRent.git
cd VroomRent
```

## Install Dependecies

### Install backend dependecies

```bash
cd backend
npm install
```

### Install frontend dependecies

```bash
cd ../frontend
npm install
```

## Start the Application

### Start backend

```bash
cd backend
node server.js
```

### Start frontend

```bash
cd ../frontend
npm run dev
```

## Environment Variables

To configure the project, you need to create two `.env` files:

- One for the **backend** inside the `backend` directory.
- One for the **frontend** inside the `frontend` directory.

You can use the provided `.env.example` files as a reference.
