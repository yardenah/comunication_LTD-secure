# Communication LTD Application

A full-stack web application with React frontend and Express.js backend, featuring user authentication and client management.

## Project Structure

```
comunication_LTD/
├── client/          # React frontend (Vite)
├── server/          # Express.js backend
└── package.json     # Root package.json for convenience
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

   Or install manually:
   ```bash
   # Root dependencies
   npm install
   
   # Server dependencies
   cd server
   npm install
   
   # Client dependencies
   cd ../client
   npm install
   ```

## Environment Configuration

**Important**: Create a `.env` file in the `server/` directory with the following variables:

```bash
# Email Configuration (for password reset functionality)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here
```

### Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Generate an App Password specifically for this application
4. Use this App Password (not your regular Gmail password) in the `.env` file

## Running the Application

### Option 1: Run both frontend and backend together
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### Option 2: Run separately

**Start the backend server:**
```bash
npm run server
# or
cd server && npm start
```

**Start the frontend development server:**
```bash
npm run client
# or
cd client && npm run dev
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/config` - Get server configuration (password policies)
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/change-password` - Change password
- `POST /api/request-reset-password` - Request password reset
- `POST /api/reset-password` - Reset password with token
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Add new client

**Interactive API Documentation**: Available at `http://localhost:5000/api-docs` (Swagger)

## Configuration

### Backend Configuration
- Port: 5000 (configurable in `server/config.js`)
- Database: SQLite (`communication_ltd.db`)
- CORS: Enabled for frontend origin (`http://localhost:3000`)

### Frontend Configuration
- Port: 3000 (configurable in `client/vite.config.js`)
- API Proxy: Configured to forward `/api` requests to backend
- Base URL: Uses relative paths for API calls

## Development

### Backend Development
- Uses nodemon for auto-restart during development
- Swagger documentation available at `http://localhost:5000/api-docs`
- Environment variables: Create `.env` file in server directory

### Frontend Development
- Vite development server with hot reload
- React Router for navigation
- API calls use relative URLs for better proxy support

## Database

The application uses SQLite with the following tables:

### Users Table
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- `username` (TEXT, UNIQUE, NOT NULL)
- `email` (TEXT, NOT NULL)
- `password` (TEXT, NOT NULL, hashed)
- `salt` (TEXT, NOT NULL, for password hashing)
- `reset_token` (TEXT, nullable)
- `reset_token_expiry` (DATETIME, nullable)

### Clients Table
- `id` (INTEGER, PRIMARY KEY)
- `fullName` (VARCHAR(100), required)
- `email` (VARCHAR(100))
- `phone` (VARCHAR(20))
- `packageName` (VARCHAR(50))
- `sector` (VARCHAR(50))
- `address` (VARCHAR(255))

### Password History Table
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- `user_id` (INTEGER, NOT NULL, FOREIGN KEY to users.id)
- `password_hash` (TEXT, NOT NULL, hashed password)
- `salt` (TEXT, NOT NULL, salt used for hashing)
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

### Database Setup
- SQLite database file: `communication_ltd.db`
- Database is automatically created on first run
- Tables are created with proper schema on server startup
- **VS Code Extension**: Install "SQLite" by "qwtel" to view and manage the database directly in VS Code

## Security Features

- Password hashing with HMAC + Salt
- Password history validation (configurable, min 1, max 100)
- Login attempt limiting
- CORS protection
- Input validation


## License

MIT
