# Sitewise

**Sitewise** is an all-in-one reporting tool, allowing users to quickly note different aspects of a property (referred to as takeoffs), take photos, create electrical box amp grids, and more. It is designed for the sales analyst, to make their job as easy as possible, and prepare accurate data that they can then import to an excel sheet for final review (referred to as costing).

# Installation

Follow these steps to set up the project on your local machine

-   Clone the repository to your local machine using the following command:
    `git clone https://<github-token>@github.com/costseg/sitewise-web.git`
-   `cd sitewise-web`
-   `npm install` (I recommend to use npm package manager only to avoid conflicts)
-   `npm run dev`

# Coding Standard

This document outlines the coding standard and best practices to be followed when developing this project. Adhering to this standard will ensure consistency, readability, and maintainability of the codebase.

## General

-   Strive for readability and maintainability over cleverness and brevity. Write code that is easy to understand for other developers.
-   Follow the coding standard consistently throughout the project to maintain a cohesive codebase.
-   Use meaningful and descriptive names for variables, functions, and components.
-   Minimize the use of comments for explaining code. Write self-explanatory code whenever possible.

## Folder Structure

-   `public/`: This directory contains static files that will be served as-is. For example, favicon.ico, images, or assets.

-   `src/`: Indicates the location of the source code of the project.

-   `src/components/`: This directory holds your React components. You can organize them based on different sections or functionalities.

-   `src/app/`: Next.js uses this folder to automatically create routes for your application. Each folder in this directory represents a page.

-   `src/utils/`: This directory can house various utility functions or helper files used throughout the project.

-   `.env.local`: This file holds your environment variables that are specific to your local development environment.

-   `.env.test`: This file holds your environment variables that are specific to your test environment.

-   `.env.prod`: This file holds your environment variables that are specific to your production environment.

-   `package.json`: This file manages your project's dependencies and scripts.

-   `next.config.js`: Use this file to configure Next.js, including setting up custom routes or modifying webpack configuration.

-   `.eslintrc.json`: This file defines the ESLint rules and configurations for your project.

-   `.prettierrc`: This file contains the Prettier configuration for your project, specifying code formatting rules.

-   `tailwind.config.js`: This file is the configuration for Tailwind CSS. You can customize the default styles or add new ones here.

## Naming Conventions

-   Use `kebab-case` for a class name attribute and for all folder and file names except for components. For example, `className="text-title"` `about-us.tsx`, `auth-page/`
-   Use `camelCase` for all variables and functions. For example, `function sendPayload(){};`, `const sheetSummary = {};`
-   Use a capital `snake_case` for all global constant variables. For example, `const VOLUME_LEVEL = 4;`
-   Use a `PascalCase` for naming React components and its file name. For example, `Header`, `Button`.

## Styles

-   Avoid inline styles in the TSX code.
-   Only use `tailwindcss` for styling any html elements

## Imports

-   Keep imports organized and grouped logically.
-   Use relative imports for files within the same directory. For example, `./global.ts`
-   Use absolute imports for files outside the current directory. Set up aliases for commonly used paths. `@/components/Button`

## Code Formatting

-   The project use ESLint, Prettier and Husky to enforce consistent code formatting.
-   Install the ESLint and Prettier extension to your editor (I recommend `Visual Studio Code`) and enable them to have a better coding experience.

## TypeScript Usage

-   Embrace TypeScript to catch type-related errors early and improve code reliability.
-   Always provide explicit type annotations for variables and function return types.
-   Avoid using the any type whenever possible. Use specific types for better type safety.

## Comments and Documentation

-   Write comments for complex logic or to explain the intent of a particular piece of code.
-   Maintain up-to-date README.md with installation instructions, project overview, and any other necessary documentation.

## Error Handling

-   Properly handle errors and exceptions. Use try-catch blocks where appropriate.
-   Provide meaningful error messages that assist in debugging.

## Testing

-   Write unit tests for important logic, utility functions, and components.
-   Use testing libraries like Jest and React Testing Library.
-   Aim for high test coverage to ensure code correctness.

By following this coding standard, we aim to create a clean, maintainable, and reliable project that is easy to understand and contribute to. Let's maintain consistency and adhere to these guidelines throughout the development process.
