# Shortlink Dashboard

<div align="center">
    <img src="./public/favicon.svg" alt="Shortlink Dashboard Logo" width="200">
</div>

## Overview

**Shortlink Dashboard** is a powerful, self-hostable link shortening service designed to simplify your URLs in a personalized and secure manner. Works with Astro, Svelte, Tailwind and Turso.

## Features

- **Self-hostable**: Full control over your data and infrastructure.
- **Easy to Use**: Simplify long URLs in seconds through an intuitive user interface.
- **Customizable**: Tailor the service to meet your specific needs.

## Getting Started

### Prerequisites

Before you begin, ensure you have Docker installed on your system. If you prefer to use Node.js directly, ensure you have Node.js and PNPM installed.

### Installation

1. **Clone the repository:**

   ```sh
   git clone --depth 1 https://github.com/arch-fan/shortlink-dashboard.git
   cd shortlink-dashboard
   ```

2. **Environment Configuration:**

   Edit the `.env` file to include your credentials and any other configuration settings.

3. **Deployment:**

   You have two options for deployment:

   - **Using Docker Compose:**

     Deploy the service using Docker for easy and reliable containerization.

     ```sh
     docker-compose up -d --build
     ```

   - **Using npm/pnpm:**

     Alternatively, use the npm script for deployment if you're not using Docker.

     ```sh
     npm run docker:deploy
     ```

## Usage

Once deployed, access the Shortlink Dashboard through your web browser (server runs at port `1234`) to start creating and managing your short links. For detailed instructions on how to use the dashboard, refer to the user guide available in the repository.

## Support

For support, feature requests, or bug reporting, please open an issue in the GitHub repository.

## Contributing

Contributions are welcome! Feel fre to contribute.

## License

Shortlink Dashboard is licensed under [MIT License](LICENSE). Feel free to fork, modify, and use it in your projects.
