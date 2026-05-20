# Developer Hub (DEV_HUB)

Developer Hub is a high-performance, real-time developer community platform engineered for scale and speed. It features a bespoke "Blueprint" aesthetic designed specifically for engineers, moving away from generic templates to offer a unique, terminal-inspired user experience.

## Features

- **Custom "Blueprint" Aesthetic:** A premium, engineering-focused dark theme featuring monospaced typography, wireframe UI components, and grid-pattern backgrounds.
- **Real-time Discussions:** Instant updates across the platform when new threads are posted or comments are made, powered by Laravel Reverb (WebSockets).
- **Reputation System (Node Power):** An integrated gamification system where users earn reputation points when their threads are upvoted by peers.
- **Markdown & Syntax Highlighting:** Full support for Markdown in discussion threads, complete with intelligent code snippet execution and syntax highlighting.
- **Secure Architecture:** Built on Laravel's robust authentication and session management.

## Tech Stack

- **Backend:** [Laravel](https://laravel.com/) (PHP)
- **Frontend:** [React](https://react.dev/) with [Inertia.js](https://inertiajs.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **WebSockets:** Laravel Reverb & Laravel Echo
- **Icons:** Lucide React

## Prerequisites

Make sure you have the following installed on your local machine:
- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL or SQLite (configured in `.env`)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd developer-hub
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install NPM dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Copy the example `.env` file and generate an application key:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Make sure to configure your database credentials (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) in the `.env` file.*

5. **Run Database Migrations:**
   ```bash
   php artisan migrate
   ```

## Running the Application Locally

Because Developer Hub utilizes real-time WebSockets and modern frontend tooling, you need to run three separate processes during local development:

1. **Start the Laravel web server:**
   ```bash
   php artisan serve
   ```

2. **Start the WebSocket server (Reverb):**
   ```bash
   php artisan reverb:start
   ```

3. **Start the Vite frontend development server:**
   ```bash
   npm run dev
   ```

Visit `http://localhost:8000` in your browser to access the application.

## License

The Developer Hub is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
