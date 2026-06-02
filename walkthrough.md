# Phase 1 Walkthrough - BlogSphere

We have bootstrapped the structure and configurations for both the backend (Spring Boot 3) and the frontend (Vite React + Tailwind CSS) of **BlogSphere**.

---

## Architectural Setup

### 1. Backend Structure (`backend/`)
We constructed a clean Maven configuration inside [pom.xml](file:///e:/BlogSphere/backend/pom.xml) utilizing:
*   **Spring Boot 3.3.0** with **Java 17**.
*   **Spring Boot Starters**: Web, Security, Data JPA, and Validation.
*   **Database**: MySQL Connector.
*   **Boilerplate reduction**: Lombok.
*   **Security & Encryption**: JJWT (Java JWT) for token issuance and standard validation.

We created the main Spring Boot entry point [BlogSphereApplication.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/BlogSphereApplication.java) and set up the configurations inside [application.properties](file:///e:/BlogSphere/backend/src/main/resources/application.properties) with database connection parameters, auto-update properties, and application secrets for the HMAC-SHA256 signature algorithm.

### 2. Frontend Structure (`frontend/`)
We initialized the React framework build environment with Vite, compiling to:
*   [package.json](file:///e:/BlogSphere/frontend/package.json): Integrates React 18, React Router v6, Axios, Lucide Icons, and PostCSS.
*   [vite.config.js](file:///e:/BlogSphere/frontend/vite.config.js): Custom build setting featuring an automated development server proxy redirection (`/api` calls map straight to port `8080` backend).
*   [tailwind.config.js](file:///e:/BlogSphere/frontend/tailwind.config.js) & [postcss.config.js](file:///e:/BlogSphere/frontend/postcss.config.js): Custom utility rules with premium design extensions (e.g. violet primary colors, smooth scrollbars, custom slate dark colors).
*   [index.html](file:///e:/BlogSphere/frontend/index.html): Configured with the premium "Inter" Google Font family and support for dynamic system dark-mode switching.
*   [App.jsx](file:///e:/BlogSphere/frontend/src/App.jsx): A highly styled default homepage to confirm functional compiling and responsive styles.

---

## Relational Database & Entity Design (Phase 2)

We successfully modeled and built our persistence engine:
*   [schema.sql](file:///e:/BlogSphere/backend/src/main/resources/schema.sql): Formulated the MySQL database schema for tables `users` and `blogs`. Established foreign key constraints (`author_id` mapping to user `id` with standard cascading options) and indexing on critical search columns (`title`, `category`) to ensure database-level optimization.
*   [User.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/entity/User.java): Formulated the user entity mapped to the `users` table, containing profile tracking fields, data size restrictions, and relationship hooks.
*   [Blog.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/entity/Blog.java): Mapped the `blogs` table with support for standard elements like auto-managed timestamps (`@CreationTimestamp` and `@UpdateTimestamp`), a Lob column definition for standard long text fields, and lazy-loading for the author entity relation.
*   [UserRepository.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/repository/UserRepository.java): Set up query routines for user operations (lookup by email, check if email is unique).
*   [BlogRepository.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/repository/BlogRepository.java): Set up user and search query endpoints using custom **JPQL with JOIN FETCH** to eager-load authors, thereby resolving the N+1 database select query performance issue during blog listings.

---

## Spring Security & Cryptographic JWT Authentication (Phase 3)

We successfully engineered a highly secure, stateless JWT token authentication platform:
*   [JwtUtils.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/security/JwtUtils.java): Implemented utility methods to generate, parse, and validate JSON Web Tokens using cryptographic keys. Handles token signatures, expirations, malformations, and unsupported states elegantly.
*   [UserDetailsImpl.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/security/UserDetailsImpl.java) & [UserDetailsServiceImpl.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/security/UserDetailsServiceImpl.java): Configured Custom user loading schemas, translating our database `User` records directly into authorization principal instances.
*   [AuthEntryPointJwt.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/security/AuthEntryPointJwt.java) & [AuthTokenFilter.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/security/AuthTokenFilter.java): Constructed a custom Filter and Entry Point that intercepts REST requests, extracts token signatures, and reports standardized HTTP 401 JSON error formatting for invalid request callers.
*   [WebSecurityConfig.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/config/WebSecurityConfig.java): Designed a comprehensive security policy. Standardized BCrypt password hashing, configured CORS origins, defined stateless cookie policies, and mapped route access (fully protecting operational endpoints while keeping public GET routes accessible).
*   **Authentication DTOs**: Created validated data wrappers ([LoginRequest](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/dto/LoginRequest.java), [SignupRequest](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/dto/SignupRequest.java), [JwtResponse](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/dto/JwtResponse.java), and [MessageResponse](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/dto/MessageResponse.java)) to isolate entity logic from serialization formats.
*   [AuthController.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/controller/AuthController.java): Exposed clean `/api/auth/register` and `/api/auth/login` mappings executing validations and providing high-quality defaults.

---

## User Profile Management (Phase 4)

We successfully implemented user profile viewing, modification, and exception handling:
*   [ResourceNotFoundException.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/exception/ResourceNotFoundException.java) & [GlobalExceptionHandler.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/exception/GlobalExceptionHandler.java): Formulated a robust global exception interceptor that serializes clean, uniform JSON responses for resource lookup failures and MethodArgument validations (bad input attributes).
*   **User DTOs**: Created [UserDTO](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/dto/UserDTO.java) to exchange profile payloads securely without sending hashed credentials, and [UserProfileUpdateRequest](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/dto/UserProfileUpdateRequest.java) to support updates.
*   [UserMapper.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/mapper/UserMapper.java): Decoupled serialization logic from database mappings.
*   [UserService.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/service/UserService.java) & [UserServiceImpl.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/service/UserServiceImpl.java): Engineered profile viewing and updating capabilities. Encodes new credentials and filters incoming avatar url strings with thorough parameter validation checks.
*   [UserController.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/controller/UserController.java): Exposed `/api/users/profile` GET and PUT routes, automatically reading principal details from Spring Security's context thread-safely.

---

## Blog Module CRUD Operations (Phase 5)

We successfully engineered full-featured blog CRUD operation endpoints with robust ownership constraints:
*   **Blog DTO Models**: Formulated [BlogDTO](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/dto/BlogDTO.java) to safely convey blog details nesting active author profiles, and created validated payload wrappers [BlogCreateRequest](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/dto/BlogCreateRequest.java) and [BlogUpdateRequest](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/dto/BlogUpdateRequest.java) to reject incomplete operations.
*   [BlogMapper.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/mapper/BlogMapper.java): Standardized database translations without boilerplate code.
*   [BlogService.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/service/BlogService.java) & [BlogServiceImpl.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/service/BlogServiceImpl.java): Programmed full transactional operations. Incorporates Unsplash defaults for empty image banners, loads queries, and compares active caller credentials against the database blog record ID to prevent cross-user mutations.
*   [BlogController.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/controller/BlogController.java): Exposes operational REST mappings. GET endpoints are left entirely public for visitors, while POST, PUT, and DELETE mappings are guarded behind JWT authorization checks.
*   [GlobalExceptionHandler.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/exception/GlobalExceptionHandler.java) Update: Registered an interceptor mapping `SecurityException` occurrences (ownership violations) directly to clean HTTP 403 Forbidden responses.

---

## Search & Filtering Module (Phase 6)

We successfully engineered a highly efficient, multi-field blog search module:
*   [BlogRepository.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/repository/BlogRepository.java) (Eager Fetched JPQL): Built an optimized, case-insensitive keyword search query that scans across post title, category, and markdown content fields simultaneously. Leveraged `JOIN FETCH` to eagerly resolve author parameters inside a single query roundtrip.
*   [BlogService.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/service/BlogService.java) & [BlogServiceImpl.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/service/BlogServiceImpl.java): Programmed the query logic, trimming user inputs, mapping results to clean DTO packages, and gracefully falling back to a full list query if a user triggers the mapping with an empty search parameter.
*   [BlogController.java](file:///e:/BlogSphere/backend/src/main/java/com/blogsphere/controller/BlogController.java): Exposed GET `/api/blogs/search?keyword=...` route to the public (allowing anyone to locate blogs of interest).

---

## Frontend Core Architecture & Reusable Component Library (Phase 7)

We successfully modeled and built our React frontend's architectural core and reusable component library:
*   [AuthContext.jsx](file:///e:/BlogSphere/frontend/src/context/AuthContext.jsx) & [useAuth.jsx](file:///e:/BlogSphere/frontend/src/hooks/useAuth.jsx): Formulated the global session context supplier and its custom wrapper hook. Reads and deserializes cached session records on mount, managing login, logout, and avatar updates cleanly.
*   **Reusable Component Library**:
    *   [Loader.jsx](file:///e:/BlogSphere/frontend/src/components/Loader.jsx): Programmed customizable animated spinners with smooth keyframes.
    *   [ProtectedRoute.jsx](file:///e:/BlogSphere/frontend/src/components/ProtectedRoute.jsx): Constructed a security checkpoint mapping session state parameters to prevent unauthenticated access.
    *   [Navbar.jsx](file:///e:/BlogSphere/frontend/src/components/Navbar.jsx) & [Footer.jsx](file:///e:/BlogSphere/frontend/src/components/Footer.jsx): Programmed dynamic headers and footers with class-based dark mode toggles, desktop search fields, avatar previews, and responsive drawer toggles.
    *   [SearchBar.jsx](file:///e:/BlogSphere/frontend/src/components/SearchBar.jsx) & [BlogCard.jsx](file:///e:/BlogSphere/frontend/src/components/BlogCard.jsx): Engineered clean search triggers and blog post previews. Strips markdown tags and truncates excerpts.
*   **Layout Adapters**: Engineered [MainLayout.jsx](file:///e:/BlogSphere/frontend/src/layouts/MainLayout.jsx) (adding dynamic viewport heights) and [AuthLayout.jsx](file:///e:/BlogSphere/frontend/src/layouts/AuthLayout.jsx) (adding card borders).
*   **Initial Page Components**: Drafted preliminary visual grids for [Home.jsx](file:///e:/BlogSphere/frontend/src/pages/Home.jsx), [Login.jsx](file:///e:/BlogSphere/frontend/src/pages/Login.jsx), [Register.jsx](file:///e:/BlogSphere/frontend/src/pages/Register.jsx), [BlogList.jsx](file:///e:/BlogSphere/frontend/src/pages/BlogList.jsx), [BlogDetails.jsx](file:///e:/BlogSphere/frontend/src/pages/BlogDetails.jsx), [CreateBlog.jsx](file:///e:/BlogSphere/frontend/src/pages/CreateBlog.jsx), [EditBlog.jsx](file:///e:/BlogSphere/frontend/src/pages/EditBlog.jsx), [Profile.jsx](file:///e:/BlogSphere/frontend/src/pages/Profile.jsx), and [NotFound.jsx](file:///e:/BlogSphere/frontend/src/pages/NotFound.jsx).
*   [App.jsx](file:///e:/BlogSphere/frontend/src/App.jsx) Router: Programmed standard routes mapping public feed list nodes publicly and locking editing profiles behind auth checks.

---

## Authentication Frontend Integration (Phase 8)

We successfully wired up our entire client-side authentication system to interface with our Spring Security backend:
*   [api.js](file:///e:/BlogSphere/frontend/src/services/api.js) (Axios Client Interceptor): Created a modular Axios configuration. Automatically appends the user's JWT Bearer token to request headers and implements global response interceptors. If a token expires (triggering an HTTP 401), it flushes local storage cache data and routes the caller straight to `/login`.
*   [authService.js](file:///e:/BlogSphere/frontend/src/services/authService.js): Declared simple, async wrappers mapping fields to REST registration and login backend endpoints.
*   [Login.jsx](file:///e:/BlogSphere/frontend/src/pages/Login.jsx) Integration: Overwrote the login page. Dispatches queries, binds parameters into the global session provider `useAuth`, handles loading spinners, and presents detailed alert alerts if authentication credentials mismatch.
*   [Register.jsx](file:///e:/BlogSphere/frontend/src/pages/Register.jsx) Integration: Overwrote the registration page. Adds local client validation filters (such as comparing duplicate password matching fields), routes exceptions into detailed error notifications, and triggers a delayed redirect to `/login` upon success.

---

## Blog Management & Operations UI (Phase 9)

We successfully modeled and built our entire frontend interface, executing all blog CRUD operations and setting up user profile pages:
*   [blogService.js](file:///e:/BlogSphere/frontend/src/services/blogService.js) & [userService.js](file:///e:/BlogSphere/frontend/src/services/userService.js): Developed modular Axios services translating all client operations to backend endpoints (GET listings, searches, detail loads, creations, profile revisions, and posts by author lookups).
*   [Home.jsx](file:///e:/BlogSphere/frontend/src/pages/Home.jsx) & [BlogList.jsx](file:///e:/BlogSphere/frontend/src/pages/BlogList.jsx): Overwrote our search feeds. Integrates real-time querying, displays empty state icons, and introduces a dynamic category filter toolbar that filters publications instantly.
*   [BlogDetails.jsx](file:///e:/BlogSphere/frontend/src/pages/BlogDetails.jsx): Programmed the full reader screen showing author descriptions and banner illustrations. Incorporates dynamic controls restricting mutations (Edit/Delete options) to post owners, and implements delete confirm modals.
*   [CreateBlog.jsx](file:///e:/BlogSphere/frontend/src/pages/CreateBlog.jsx) & [EditBlog.jsx](file:///e:/BlogSphere/frontend/src/pages/EditBlog.jsx): Engineered our write and update pages. Pre-populates inputs, handles state loading, performs local content validations, and routes users to the published posts on success.
*   [Profile.jsx](file:///e:/BlogSphere/frontend/src/pages/Profile.jsx): Programmed the account settings panel. Enables users to update name, avatars, or passwords, dispatches revisions back to the global `useAuth` hook (synchronizing visual header profile images instantly), and displays an authored publication grid.

---

## Modern UI Polish & Animation Layer (Phase 10)

We applied a comprehensive premium polish pass across the entire frontend application:
*   [ToastContext.jsx](file:///e:/BlogSphere/frontend/src/context/ToastContext.jsx): Built a fully featured, globally accessible notification system. Features auto-dismiss timers, type-themed coloring (success=emerald, error=red, warning=amber, info=violet) with matching SVG icons, and a `slideInRight` entrance animation. Wired into **all** user-facing operations: login errors, registration, blog publish, edit saves, delete confirmations, and profile updates.
*   [index.css](file:///e:/BlogSphere/frontend/src/index.css): Rewrote our global stylesheet to include production-ready CSS keyframe animations: `fadeIn` (page section entrances), `slideInRight` (toast notifications), `scaleIn` (modal dialogs), a full **shimmer skeleton** pulse effect, and `scrollbar-none` utility for horizontal filter bars.
*   [SkeletonCard.jsx](file:///e:/BlogSphere/frontend/src/components/SkeletonCard.jsx): Created a shimmer-animated placeholder component that precisely matches the `BlogCard` layout. Replaces the basic spinner in Home and BlogList during initial data loads for a far more premium experience.
*   **Dark Mode**: Fully class-based dark mode toggle in the Navbar persists to `localStorage` and instantly repaints the entire app using Tailwind's `dark:` variant classes.
*   **Mobile Navigation**: Fully implemented hamburger menu drawer with smooth mounting, session-aware links, and dark mode toggle.
*   **Micro-animations**: `active:scale-95` on all interactive buttons, `group-hover:scale-105` on blog card images, `group-hover:translate-x-1` on chevron icons, `animate-bounce` on empty state icons.

---

## Next Steps
We are ready to move on to **Phase 11: Testing & Deployment Documentation**, which will entail:
1. Creating a Postman Collection JSON with sample API requests and responses.
2. Writing the production-ready `README.md`.
3. Setting up deployment configuration files for Render (backend) and Vercel (frontend).









