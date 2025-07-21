# 🌱 Voluntime – Mentorship Made Simple

**Voluntime** is a volunteer-based mentorship platform where anyone can sign up as a mentor or mentee and connect for knowledge sharing. Built with **Next.js App Router**, **Tailwind CSS**, and **Supabase**, it offers a clean, scalable foundation for peer-to-peer mentorship.

---

## ✨ Features

- 🔐 Supabase Auth (Sign Up & Log In)
- 🧑‍🏫 Mentor directory with skills and brief intros
- 🗓 Book a session with a mentor
- 📋 Mentor registration form with availability, expertise, and preferences
- 🎨 Responsive UI using Tailwind CSS
- ⚙️ Next.js App Router with SSR & server/client components

---

## 📦 Tech Stack

- **Frontend**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Auth & DB**: Supabase
- **Hosting**: Vercel (recommended)

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/voluntime.git
cd voluntime
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root folder:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> You can find these in your Supabase project settings.

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧾 Project Structure (Simplified)

```
/app
  /mentor
    /[id]          → Dynamic mentor detail page
    /signup        → Mentor signup form
  /login           → Login page
  /signup          → Role selection (mentor or mentee)
  /dashboard       → (Coming soon)

/components        → Reusable UI components
/lib               → Supabase client setup
/mock              → Static mock data (for development)
```

---

## 📄 License

MIT — free for personal and commercial use.

---

## 🌐 Live Demo

🚧 Coming soon at [https://voluntime.vercel.app](https://voluntime.vercel.app)

---

## 🤝 Contributing

This is an MVP in progress — pull requests and ideas are welcome. Fork it, build your own, or suggest improvements.