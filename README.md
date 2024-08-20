# 原價屋網頁改寫

## Overview

The goal of this project is to redesign and improve the user experience and interface of the CoolPC website (原價屋，URL: https://www.coolpc.com.tw/evaluate.php). After conducting a heuristic evaluation, we analyzed the UI and UX of the CoolPC website, identified design issues that hinder user experience, and proposed solutions to address these issues. The improved interface is then developed based on these solutions.

- UI/UX Evaluation and Analysis Document: [Link to Google Slides](https://docs.google.com/presentation/d/1YjUOc8n5QO7VjJPnZezKhiNfEG9MV3g11_eZlakmZ5I/edit?usp=sharing)

This is a responsive web application offering the following key functionalities:

1. Product Listing (產品列表): Display a list of products with detailed information.
2. Product Comparison (產品比較): Allows users to compare multiple products side by side.
3. Shopping Cart (購物車): Users can add products to a shopping cart and manage their selections.


## Technologies Used

This project is built using the following languages and packages:

- **Vue 3**
- **TypeScript**
- **Tailwind CSS**
- **Faker.js & Mock.js** - generate mock data and api
- **Naive UI** - UI component package
- **Pinia** - status management
- **Vite** - fast development tool
- **GitHub** - version control 


## Project Structure

```
src/
├── assets/         # Static assets (images)
├── components/     # Reusable Vue components
├── interfaces/     # TypeScript interfaces
├── mock/           # Mock data and api
├── stores/         # Pinia stores for state management
├── types/          # Custom TypeScript type definitions
├── views/          # Main application views (pages)
├── App.vue         # Root Vue component
├── main.ts         # Entry point for the application
├── router.ts       # Application routes configuration
├── style.css       # Global styles
├── package-lock.json   # npm dependency lock file
├── package.json        # Project metadata and dependencies
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.app.json   # TypeScript configuration specific to the app
├── tsconfig.json       # Main TypeScript configuration
├── tsconfig.node.json  # TypeScript configuration specific to Node.js
└── vite.config.ts      # Vite configuration file
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js 
- npm

### Installation

1. Clone the repository:

```
git clone https://github.com/jesstc/coolpc-redesign.git
cd coolpc-redesign
```

2. Install dependencies:

```
npm install
```

### Running the Project Locally

To start the development server, run:

```
npm run dev
```
