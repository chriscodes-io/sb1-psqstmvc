# Project Setup Guide

## 1. MongoDB Setup

1. Start MongoDB Service
   ```bash
   brew services start mongodb-community
   ```

2. Create Admin User
   ```javascript
   use admin
   db.createUser({
     user: "weather-api-admin",
     pwd: "auqHePSDp2rFX6cA",
     roles: ["root"]
   })
   ```

3. Enable Authentication
   ```bash
   # Add to mongod.conf:
   security:
     authorization: enabled
   ```

4. Restart MongoDB
   ```bash
   brew services restart mongodb-community
   ```

## 2. Project Setup

1. Clone Repository
   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. Install Dependencies
   ```bash
   npm install
   ```

3. Configure Environment
   - Copy `.env.example` to `.env`
   - Update with your credentials
   - Generate encryption key:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
     ```

4. Start Development Server
   ```bash
   npm run dev
   ```

## 3. Testing

1. Run Tests
   ```bash
   npm test
   ```

## 4. Security Notes

- Keep your `.env` file secure and never commit it
- Regularly rotate the JWT_SECRET and MONGODB_ENCRYPTION_KEY
- Monitor MongoDB logs for unauthorized access attempts