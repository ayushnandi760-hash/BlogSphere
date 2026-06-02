# Task List - BlogSphere Development

## Phase 1: Project Architecture & Bootstrapping
- [x] Create Backend maven structure (`backend/pom.xml`)
- [x] Create Backend directories & main Spring Boot application (`BlogSphereApplication.java`)
- [x] Setup Backend `application.properties`
- [x] Create Frontend scaffolding (`frontend/package.json`, `vite.config.js`, `tailwind.config.js`)
- [x] Setup Frontend directory structure and entry points (`index.html`, `src/main.jsx`, `src/index.css`)
- [x] Verify Phase 1 structures are complete

## Phase 2: Database Design
- [x] Create SQL Schema file (`schema.sql`)
- [x] Create `User` entity
- [x] Create `Blog` entity
- [x] Create `UserRepository` and `BlogRepository` interfaces
- [x] Setup relations and verify database persistence config

## Phase 3: Authentication System
- [x] Implement JWT utility helpers (`JwtUtils.java`)
- [x] Implement Custom User Details & Service (`UserDetailsImpl.java`, `UserDetailsServiceImpl.java`)
- [x] Implement Security configs & CORS (`WebSecurityConfig.java`)
- [x] Create JWT Authentication entry point & filter
- [x] Implement Auth Controller for Registration & Login (`AuthController.java`)
- [x] Add Request validations & DTOs for signup/login

## Phase 4: User Module
- [x] Implement User Profile DTOs (`UserDTO`, `UserProfileUpdateRequest`)
- [x] Implement Service layer logic for profile retrieval and update
- [x] Implement User Controller (`UserController.java`)
- [x] Add support for profile image URL updates

## Phase 5: Blog Module
- [x] Create Blog DTOs (`BlogDTO`, `BlogCreateRequest`, `BlogUpdateRequest`)
- [x] Create custom mapper classes (`BlogMapper`, `UserMapper`)
- [x] Implement Blog Service CRUD methods
- [x] Implement Blog Controller with ownership validations
- [x] Add error handlers for blog retrieval, ownership violations

## Phase 6: Search Module
- [x] Implement custom repository methods/Specifications for keyword search
- [x] Update Blog Service to handle title, content, and category lookups
- [x] Expose `/api/blogs/search` endpoint

## Phase 7: Frontend Core & Component Library
- [x] Configure React Router setup in `routes/`
- [x] Implement Navbar component
- [x] Implement Footer component
- [x] Implement SearchBar, Loader, and ProtectedRoute components
- [x] Create basic layouts (MainLayout, AuthLayout)

## Phase 8: Frontend Authentication State
- [x] Implement Auth Context and Auth Provider
- [x] Create custom useAuth hooks
- [x] Create authentication services (Axios client, localStorage helpers)
- [x] Setup Login & Register screen styling and state integration

## Phase 9: Blog Management UI
- [x] Build Home feed and public blog reading view
- [x] Implement Create Blog form and validation
- [x] Implement Edit Blog form
- [x] Wire up delete functionalities with confirm modal
- [x] Build User Profile view

## Phase 10: Modern UI Polish
- [x] Implement Dark Mode context/state toggle
- [x] Build mobile navigation menu
- [x] Setup dynamic toasts for notifications
- [x] Polish empty states and loading skeletons

## Phase 11: Testing & Documentation
- [x] Create API request/response examples and Postman Collection
- [x] Write production-ready README.md
- [x] Create deployment config files (render.yaml, vercel.json)
- [x] Add .env.example and .gitignore
