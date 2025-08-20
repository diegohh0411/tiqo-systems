# Tiqo Systems

This is a monorepo developed entirely by Diego Hernandez Herrera. There's a Vendure backend, which is a headless ecommerce platform. There's a Nuxt frontend, which relies on Vue.js for reactivity. 

Both codebases communicate with each other via GraphQL queries, and the monorepo has a couple of tools that make developing easier. For example, there's a `codegen` command in the frontend's `package.json` file buils TypeScript interfaces and types from the backend's schema that the GraphQL API has available upon request.

This repository demonstrates my ability to make architectural decisions and follow through with the full-stack coding.
