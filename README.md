# Nuxt Authentication App

A secure authentication system built with Nuxt 4, MongoDB, and Mongoose featuring user registration, login, and protected routes.

## Features

- ✅ User registration with validation
- ✅ Secure login with JWT authentication
- ✅ HTTP-only cookie sessions
- ✅ Protected routes with middleware
- ✅ Input sanitization and validation
- ✅ NoSQL injection prevention
- ✅ Rate limiting
- ✅ Password hashing with bcrypt
- ✅ Animated error messages
- ✅ Responsive UI

## Tech Stack

- **Framework:** Nuxt 4.3.1
- **Database:** MongoDB with Mongoose 9+
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt, validator, mongo-sanitize
- **Runtime:** Node.js

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd <project-name>
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a cluster on MongoDB:**
   If you haven't already, sign up to MongoDB and create a cluster using their free tier.

4. **Create environment file:**
   Replace the `.env.example` file with a `.env` file in the root directory:
   Fill in MongoDB info and create your JWT secret

5. **Run the development server:**

```bash
npm run dev
```

Visit `http://localhost:3000`

## Security Features

### Input Validation

- Email format validation
- Password strength requirements (8+ chars, letters + numbers)
- Length limits on all inputs
- Type checking

### Sanitization

- NoSQL injection prevention
- XSS protection with HTML escaping
- MongoDB operator removal
- Strict schema enforcement

### Authentication

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with 7-day expiration
- HTTP-only cookies (prevent XSS)
- Secure cookies in production

### Rate Limiting

- 5 login/register attempts per 15 minutes per IP
- Prevents brute force attacks
