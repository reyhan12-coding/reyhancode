# ReyhanCODE – AI-Powered Code Review Assistant

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

## 📸 Tampilan Aplikasi

### 🔐 Register & Login

| **Register** | **Login** |
| :---: | :---: |
| ![Register Page](https://github.com/user-attachments/assets/90d7b681-d8c7-4c05-8b2b-164946bddcb8) | ![Login Page](https://github.com/user-attachments/assets/c1170061-ad04-47c1-91c7-5994704bc7ce) |

### 🖥️ Dashboard

| **Input Kode** | |
| :---: | :---: |
| ![Input Kode](https://github.com/user-attachments/assets/b8e4b0d0-1d1e-4bf3-a742-223991dd7c04) | |

| **Upload File** | **Dari Github** |
| :---: | :---: |
| ![Upload File](https://github.com/user-attachments/assets/f358cc69-dec5-4202-b4d2-d9547829ac7e) | ![Dari Github](https://github.com/user-attachments/assets/4eca73d4-2850-4efd-81bc-79fd0003fd21) |

### 🧪 Contoh Implementasi –  (JavaScript)

| **Kode Javascript (banyak masalah)** | |
| :---: | :---: |
| ![Kode Javascript (banyak masalah)](https://github.com/user-attachments/assets/b5c5ca11-73f1-4607-9d8d-6adfc2098df0) | |

| **Hasil Analisis Kode** | |
| :---: | :---: |
| ![Hasil Analisis Kode](https://github.com/user-attachments/assets/ef0de85f-a15d-4b94-9843-480f3f1a55f0) | |

### OUTPUT KODE 

| **Resiko Tinggi** | **Resiko Sedang** |
| :---: | :---: |
| ![Resiko Tinggi](https://github.com/user-attachments/assets/5ed6a210-7c56-47fa-a03c-b48c1c92c3d2) | ![Resiko Sedang](https://github.com/user-attachments/assets/aa78d0dd-1e8a-4697-9b3d-9fdaf6f1725c) |

| **Resiko Sedang** | **Resiko Rendah** |
| :---: | :---: |
| ![Resiko Sedang](https://github.com/user-attachments/assets/5915cfa7-fb61-4c67-9b50-d678a56459c5) | ![Resiko Rendah](https://github.com/user-attachments/assets/1ea71f1f-2545-41a2-b4f6-fbf98a454f5e) |

### ⌛ Riwayat Kode

| **Riwayat Kode** | |
| :---: | :---: |
| ![Riwayat Kode](https://github.com/user-attachments/assets/bfd7ea55-62e0-4026-94c4-34c4725fd778) | |

---

### 📦 Instalasi

### Prerequisites

- Node.js 18+ dan npm
- PostgreSQL database (lokal atau cloud) ( Saya memakai [Neon](https://neon.tech) )
- HUGGINGFACE API Key

### Step 1: Clone Repository

```bash
git clone https://github.com/reyhan12-coding/reyhancode
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

# HUGGINGFACE API
HUGGINGFACE_API_KEY="hf_your_key_here""

# JWT Secret
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

---

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

  ---

## 🎨 Fitur UI/UX

- ✨ Modern dark mode design
- 🎨 Glassmorphism effects
- 🌈 Vibrant color palette
- ⚡ Smooth animations
- 📱 Responsive layout
- 🔍 Syntax highlighting
- 💫 Loading states dengan progress indicator

---

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

---

## 🙏 Acknowledgments

- OpenAI GPT-4 untuk AI code analysis
- Next.js team untuk amazing framework
- Prisma untuk fantastic ORM

---

## 👨‍💻 Tentang Pembuat

Project ini dibuat oleh **Reyhan Arrafif Athalla**, mahasiswa Teknik Informatika Semester 5.

Saya memiliki ketertarikan kuat pada **Software Engineering** dan **Web Development**. Project ini dibuat untuk melatih kemampuan saya dalam membangun aplikasi *Full Stack* yang siap produksi.

Saat ini saya sedang mencari kesempatan **Magang (Internship)**.

* 📧 **Email:** antnest15@gmail.com
* 🐙 **GitHub:** [github.com/reyhan12-coding](https://github.com/reyhan12-coding)

---

**Dibuat dengan ❤️ untuk membantu developer menulis kode yang lebih aman, rapi, dan berkualitas**
