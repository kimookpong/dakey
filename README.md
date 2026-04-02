# 🚀 DaKey Server Management System

DaKey is a premium, secure, and mobile-responsive dashboard designed for centralized management of server credentials and domain health monitoring. Built with modern web technologies, it offers a sleek "Glassmorphism" interface and robust security features.

---

## ✨ Key Features

### 🛡️ Security & Authentication
- **Single Session Enforcement**: Automatically invalidates older sessions when a new login occurs, ensuring one active session per user.
- **AES-256-GCM Encryption**: All server passwords are encrypted at rest using industry-standard AES encryption.
- **JWT Protection**: Secure authentication with `httpOnly` cookies and 1-year persistent sessions.

### 🖥️ Server Management
- Supports **SSH, SFTP, and FTP** protocols.
- One-click launch links for SSH terminals and FileZilla.
- Quick-copy utility for all sensitive information.
- Mobile-friendly card-based interface with premium SVG icons.

### 🌐 Domain Monitoring
- **Real-time Health Check**: Monitor DNS, TCP (Ping), and HTTP status for all managed domains.
- **Host Integration**: Link domains directly to existing server records.
- **Service Management**: Multi-select and display running services (Nginx, PM2, Docker, etc.).
- **Audit Logs**: Integrated "Update Note" system with date-stamped history for tracking changes.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Security**: [Jose](https://github.com/panva/jose) (JWT), Node.js `crypto`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Custom Glassmorphism Design System)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL Database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kimookpong/dakey.git
   cd dakey
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dakey"
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="your_secure_password"
   JWT_SECRET="your_jwt_secret"
   ENCRYPTION_KEY="64_char_hex_key"
   ```

4. **Database Migration**:
   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 📸 Screenshots

### Dashboard Overview
![Dashboard](/Users/cdimac/.gemini/antigravity/brain/fc3249d0-02a8-45af-b89e-947d55482b4a/.system_generated/click_feedback/click_feedback_1774684469457.png)

### Domain Health & Services
![Domains](/Users/cdimac/.gemini/antigravity/brain/fc3249d0-02a8-45af-b89e-947d55482b4a/.system_generated/click_feedback/click_feedback_1774684581860.png)

---

## 📜 License
This project is private and intended for DaKey internal use.

---
*Developed with ❤️ by Antigravity*
