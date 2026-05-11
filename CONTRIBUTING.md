# 🤝 Contributing to Securebank

Thank you for your interest in contributing! Here's how to get started.

---

## 📋 Before You Start

- Check existing [Issues](https://github.com/Neha80915/Securebank/issues) before creating a new one
- Check the [TODO.md](TODO.md) for planned features
- For major changes, open an issue first to discuss

---

## 🛠️ Setup for Development

```bash
# 1. Fork the repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/Securebank.git
cd Securebank

# 3. Install dependencies
npm install                  # frontend
cd backend && npm install    # backend

# 4. Create .env file
cp backend/.env.example backend/.env
# Fill in your values

# 5. Run the project
node backend/server.js    # terminal 1
npm run dev               # terminal 2
```

---

## 🌿 Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/name` | `feature/dark-mode` |
| Bug fix | `fix/name` | `fix/login-error` |
| Docs | `docs/name` | `docs/update-readme` |
| Style | `style/name` | `style/dashboard-ui` |
| Refactor | `refactor/name` | `refactor/auth-controller` |

---

## ✅ Commit Message Format

```
type: short description

Examples:
feat: add dark mode toggle
fix: resolve login redirect bug
docs: update API endpoint docs
style: improve mobile responsive layout
refactor: clean up auth controller
test: add unit tests for transfer API
```

---

## 🔁 Pull Request Process

1. Create a branch from `main`
2. Make your changes
3. Test everything works locally
4. Push your branch to GitHub
5. Open a Pull Request to `main`
6. Describe what you changed and why
7. Wait for review and approval

---

## 📁 File & Code Guidelines

- Use **TypeScript** for all frontend files
- Use **camelCase** for variables and functions
- Use **PascalCase** for React components
- Keep components small and focused
- Add comments for complex logic

---

## 🚫 Never Commit These

```
.env
node_modules/
backend/database/*.db
dist/
*.log
```

These are already in `.gitignore` — make sure yours is up to date.

---

## 🐛 Reporting Bugs

Open an Issue with:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Screenshots if possible

---

## 💡 Suggesting Features

Open an Issue with:
- Feature description
- Why it would be useful
- Any design ideas or mockups

---

## 💬 Questions?

Open an issue or reach out via GitHub. Happy coding! 🚀

---

> Made with ❤️ by [Neha80915](https://github.com/Neha80915)