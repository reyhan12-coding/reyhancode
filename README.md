<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/b2ccb0f0-c82b-4f2d-aa61-a4e8d98c386b" /># ReyhanCODE – AI-Powered Code Review Assistant

![ReyhanCODE Banner](https://img.shields.io/badge/ReyhanCODE-AI%20Code%20Review-6366f1?style=for-the-badge)

**ReyhanCODE** adalah platform web profesional untuk **menganalisis kualitas kode program secara otomatis** menggunakan **AI gratis + Smart Pattern Analysis**, serta memberikan **saran perbaikan yang jelas, relevan, dan dapat langsung diterapkan**.

Platform ini dirancang untuk **developer pemula hingga profesional** dengan dukungan **JavaScript, TypeScript, dan Python**.

---

## 🌐 Live Demo
Cobalah aplikasi ini secara langsung:
### 👉 [KLIK DISINI UNTUK MEMBUKA WEBSITE](https://reyhancode.vercel.app/login)

---


## 🎯 Fitur Utama

### 🔍 Analisis Kode Multi-Bahasa
Mendukung analisis untuk:
- **JavaScript**
- **TypeScript**
- **Python**

### 🧠 Smart Analysis Engine (Gratis)
- **AI Hugging Face (StarCoder)** sebagai primary analyzer (FREE tier)
- **Smart Mock Pattern Engine** sebagai fallback (offline-safe)
- Tidak membutuhkan OpenAI API Key

### 🛡️ Kategori Analisis
- **Code Smell Detection**
- **Security Vulnerability Analysis**
- **Performance Optimization**
- **Best Practice Recommendation**

### ⭐ Fitur Unggulan
- **Severity Level**: Low / Medium / High
- **Before vs After Code Preview**
- **Penjelasan AI (Reasoning)**
- **Review History**
- **Quality Score (0–100)**
- **Score Breakdown**:
  - Readability
  - Security
  - Performance
  - Maintainability
- **Mode Pemula & Profesional**

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Next.js API Routes (Node.js)
- **Database**: PostgreSQL (Neon / Supabase / Railway)
- **ORM**: Prisma
- **AI Engine**:
  - Hugging Face (StarCoder – FREE)
  - Smart Mock Analyzer (Pattern Based)
- **Authentication**: JWT + Middleware
- **Styling**: Modern Dark Mode UI

---

## 📦 Instalasi

### Prerequisites

- Node.js 18+ dan npm
- PostgreSQL database (lokal atau cloud)
- OpenAI API Key

### Step 1: Clone Repository

```bash
cd reyhancode
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Environment Variables

Salin `.env.example` menjadi `.env`:

```bash
copy .env.example .env
```

Edit `.env` dan isi dengan kredensial Anda:

```env
# Database
DATABASE_URL="postgresql://username:password@hostname:5432/reyhancode?schema=public"

# OpenAI API
OPENAI_API_KEY="sk-your-openai-api-key-here"

# JWT Secret (generate random string minimum 32 karakter)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 4: Setup Database

Generate Prisma Client dan push schema ke database:

```bash
npx prisma generate
npx prisma db push
```

### Step 5: Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🚀 Deployment

### Build untuk Production

```bash
npm run build
npm start
```

### Deploy ke Vercel

1. Push kode ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Tambahkan environment variables di Vercel dashboard
4. Deploy!

### Database Cloud (Recommended)

Gunakan salah satu provider berikut untuk PostgreSQL cloud:
- [Supabase](https://supabase.com) (Free tier tersedia)
- [Railway](https://railway.app)
- [Neon](https://neon.tech)
- [Vercel Postgres](https://vercel.com/storage/postgres)

## 📖 Cara Menggunakan

### 1. Registrasi & Login
- Buka aplikasi
- Klik "Daftar di sini" untuk membuat akun
- Login dengan email dan password

### 2. Analisis Kode
Tiga cara input kode:

**Metode 1: Paste Kode**
- Di dashboard, paste kode Anda langsung

**Metode 2: Upload File**
- Upload file `.js`, `.ts`, atau `.py`

**Metode 3: Dari GitHub**
- Masukkan URL repository
- Masukkan path file (contoh: `src/index.js`)
- Opsional: Tambahkan GitHub token untuk private repo

### 3. Pilih Mode Analisis
- **Mode Pemula**: Penjelasan sangat detail dan edukatif
- **Mode Profesional**: Ringkas dan teknis

### 4. Klik "Analisis Kode"
AI akan:
- Membaca kode Anda
- Mendeteksi masalah
- Memberikan saran perbaikan
- Menampilkan before/after code
- Menjelaskan reasoning
- Memberikan skor kualitas

### 5. Lihat Riwayat
- Klik "Riwayat" di navbar
- Filter berdasarkan bahasa atau cari file
- Klik review untuk melihat detail

## 🎨 Fitur UI/UX

- ✨ Modern dark mode design
- 🎨 Glassmorphism effects
- 🌈 Vibrant color palette
- ⚡ Smooth animations
- 📱 Responsive layout
- 🔍 Syntax highlighting
- 💫 Loading states dengan progress indicator

## 🔐 Keamanan

- Password di-hash menggunakan bcryptjs
- JWT tokens disimpan di HTTP-only cookies
- Protected routes menggunakan middleware
- Input validation di client dan server
- Database queries menggunakan Prisma (mencegah SQL injection)

## 📝 Database Schema

### User
- id, name, email, password, timestamps

### CodeReview
- id, userId, language, sourceType, code, score, fileName, githubUrl, label, timestamps

### ReviewResult
- id, reviewId, category, severity, title, description, suggestion, codeBefore, codeAfter, reasoning, line

## 🤝 Contributing

Kontribusi selalu diterima! Silakan:
1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License.

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk meningkatkan kualitas kode developer Indonesia

## 🙏 Acknowledgments

- OpenAI GPT-4 untuk AI code analysis
- Next.js team untuk amazing framework
- Prisma untuk fantastic ORM
- Seluruh developer yang berkontribusi pada open source

---

**Catatan**: Pastikan Anda memiliki OpenAI API Key yang valid. Penggunaan API akan dikenakan biaya sesuai pricing OpenAI.

Untuk pertanyaan atau dukungan, silakan buka issue di GitHub repository.
