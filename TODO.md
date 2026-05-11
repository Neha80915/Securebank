# ✅ Securebank — TODO & Roadmap

Track pending features, bugs, and improvements here.

---

## 🔴 Critical (Fix ASAP)

- [ ] Purge `.env` from full git history using `git filter-branch`
- [ ] Add input validation on all backend API routes
- [ ] Add rate limiting on `/api/auth/login` to prevent brute force
- [ ] Hash passwords using bcrypt (verify it's implemented)
- [ ] Add CORS configuration to backend `server.js`

---

## 🟡 Important Improvements

### Frontend
- [ ] Add loading spinners on all pages (Dashboard, Transfer, Transactions)
- [ ] Add form validation on LoginPage (empty fields, email format)
- [ ] Add form validation on TransferPage (amount limits, account format)
- [ ] Show error messages to user on API failures
- [ ] Make all pages fully mobile responsive
- [ ] Add empty state UI when no transactions exist

### Backend
- [ ] Add proper error handling middleware
- [ ] Add request logging (morgan)
- [ ] Add input sanitization to prevent SQL injection
- [ ] Add `.env.example` with all required variables documented
- [ ] Add API response structure consistency (`{ success, data, message }`)

---

## 🟢 New Features

- [ ] Dark / Light mode toggle
- [ ] Transaction search and filter by date/amount/type
- [ ] PDF statement download
- [ ] User profile edit page
- [ ] Notification center (in-app)
- [ ] Two-factor authentication (2FA)
- [ ] Forgot password / reset password flow
- [ ] Account settings page
- [ ] Multiple account support per user

---

## 🚀 Deployment

- [ ] Deploy frontend on **Vercel**
- [ ] Deploy backend on **Render** or **Railway**
- [ ] Set up environment variables on hosting platforms
- [ ] Add live demo link to README
- [ ] Add screenshots to README

---

## 📖 Documentation

- [x] Add README.md
- [x] Add TODO.md
- [ ] Add `.env.example`
- [ ] Add API documentation (Postman collection or Swagger)
- [ ] Add code comments to complex functions
- [ ] Add CONTRIBUTING.md

---

## 🧪 Testing

- [ ] Add unit tests for backend controllers (Jest)
- [ ] Add frontend component tests (React Testing Library)
- [ ] Test all API endpoints with Postman
- [ ] Test on mobile devices

---

## 🎨 UI Polish

- [ ] Add favicon
- [ ] Add page transitions/animations
- [ ] Improve card design on Cards page
- [ ] Add success/error toast notifications
- [ ] Add skeleton loaders instead of spinners

---

## ✅ Completed

- [x] Project pushed to GitHub
- [x] Removed `.env` from repository
- [x] Removed `securebank.db` from repository
- [x] Added project description on GitHub
- [x] Made repository public
- [x] Full MVC backend structure
- [x] JWT authentication
- [x] Protected routes
- [x] ATM Locator feature
- [x] SMS notification module

---

> Last updated: May 2026