# Tiqo Systems

### A frictionless "pay-at-table" platform enabling restaurant diners to split checks and pay instantly via QR code, fully integrated with existing POS infrastructure.

---

## 🛠 Tech Stack

![Nuxt](https://img.shields.io/badge/Nuxt.js-00C58E?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vendure](https://img.shields.io/badge/Vendure-17C1FF?style=for-the-badge&logo=vendure&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Adyen](https://img.shields.io/badge/Adyen-0ABF53?style=for-the-badge&logo=adyen&logoColor=white)

---

## 🚀 Key Features

*   **Granular Split-Checks:** A complex UI/UX flow allowing diners to select specific individual items (or shared items) from a live table order to pay for exactly what they consumed.
*   **Mono-Directional POS Sync:** Implements a robust "Transposer" service that synchronizes orders, tables, and line items in real-time from the physical Parrot POS system into this web application.
*   **External "Dummy" Product Mapping:** Ingenious handling of external POS items by mapping them to dynamic "External System Dummy Products" in Vendure, allowing the commerce engine to process items it doesn't natively "own."
*   **End-to-End Type Safety:** Automated GraphQL code generation ensures that frontend components are strictly typed against the backend schema, eliminating runtime API errors.

---

## 🏗 Architectural Decisions

This monorepo showcases several deliberate architectural choices designed for scalability and maintainability:

*   **Vendure (Headless Commerce):** I chose Vendure over building a custom backend from scratch because of its powerful plugin system. By encapsulating custom logic within the `TiqoPlugin`, I extended the core data models (Orders, Tables) to support restaurant-specific workflows without modifying the framework's core, ensuring easy upgrades.
*   **Adapter Pattern for POS Integration:** To avoid vendor lock-in, I implemented an **Adapter Pattern** (`ParrotPosAdapter`). This decouples the internal business logic from the specific implementation details of the Parrot POS API. Adding a new POS provider (e.g., Micros or Toast) would only require writing a new adapter class, not rewriting the core sync logic.
*   **Nuxt 3 & Server-Side Rendering (SSR):** Nuxt was selected to ensure fast initial load times for users on mobile data networks in restaurants. The file-based routing and auto-imports significantly accelerated the prototyping phase.
*   **Strict GraphQL Contracts:** I enforced a schema-first approach. The frontend uses `graphql-codegen` to generate TypeScript types directly from the backend's schema. This acts as a contract test: if the backend API changes, the frontend build fails immediately, preventing subtle bugs from reaching production.

---

## ⚡ Getting Started

### Prerequisites
*   Node.js v20+
*   Docker & Docker Compose
*   PNPM (`npm install -g pnpm`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/diegohh0411/tiqo-systems
    cd tiqo-systems
    ```

2.  **Install dependencies (Monorepo root):**
    ```bash
    pnpm install
    ```

3.  **Run the Development Servers:**
    From the root directory, you can run both frontend and backend in parallel:
    ```bash
    pnpm dev
    ```
    *   **Frontend:** http://localhost:4200
    *   **Backend:** http://localhost:3000
    *   **Mock POS Server:** http://localhost:3232 (Simulates external POS responses from Parrot)

---

## 🔮 Project Status & Roadmap

This project is currently a **functional MVP** serving as a portfolio demonstration of full-stack commerce architecture.

**Future Improvements:**
*   [ ] **Webhooks Implementation:** Replace polling mechanism with webhooks for instant POS updates.
*   [ ] **User Loyalty System:** Implement the "HistoryEntry" tracking to reward frequent diners.
*   [ ] **Admin Dashboard:** A dedicated analytics view for restaurant owners to see split-payment metrics.
*   [ ] **Universal Adapter:** Abstract the POS adapter further to support generic CSV/JSON imports for legacy systems.
