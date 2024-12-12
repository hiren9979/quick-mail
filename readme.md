# Email Template Manager

A modern web application for managing and sending email templates built with Angular and Node.js.

## Features

- Create, edit, and delete email templates
- Send emails using saved templates
- Modern, responsive UI with Material Design
- Real-time form validation
- Mobile-friendly interface

## Tech Stack

### Frontend
- Angular 16+
- Angular Material UI
- TypeScript
- RxJS
- CSS Grid & Flexbox

### Backend
- Node.js
- Express.js
- JSON file storage

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd email-webapp
```

2. Install Frontend Dependencies
```bash
cd email-webapp
npm install
```

3. Install Backend Dependencies
```bash
cd ../server
npm install
```

## Running the Application

1. Start the Backend Server
```bash
cd server
npm start
# Server will start on http://localhost:3000
```

2. Start the Frontend Application
```bash
cd email-webapp
ng serve
# Application will be available at http://localhost:4200
```

## Project Structure

```
email-webapp/
├── email-webapp/          # Frontend Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── home/     # Email sending component
│   │   │   └── template/ # Template management component
│   │   └── ...
│   └── ...
└── server/               # Backend Node.js application
    ├── server.js         # Express server setup
    └── templates.json    # Template storage
```

## API Endpoints

- `GET /api/templates` - Get all templates
- `POST /api/templates` - Create new template
- `PUT /api/templates` - Update existing template
- `DELETE /api/templates` - Delete template

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
