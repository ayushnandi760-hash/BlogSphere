# BlogSphere Production-Ready Enhancements Plan

This document outlines the plan to implement the 10 requested features to enhance the BlogSphere platform without rebuilding the existing functional project.

## User Review Required

Please review the following proposed changes and confirm if this aligns with your expectations. Once approved, I will proceed with executing the implementation.

## Proposed Changes

### Backend Enhancements

#### `backend/src/main/java/com/blogsphere/`
- **[MODIFY] `repository/BlogRepository.java`**: Add `findByCategory(String category)` method. (Note: Search functionality already exists in the backend, I will reuse the existing `/api/blogs/search` endpoint).
- **[MODIFY] `service/BlogService.java` & `service/impl/BlogServiceImpl.java`**: Add `getBlogsByCategory(String category)` method.
- **[MODIFY] `controller/BlogController.java`**: Add `GET /api/blogs/category/{category}` endpoint.
- **[NEW] `entity/ContactMessage.java`**: Create entity for storing contact form submissions.
- **[NEW] `repository/ContactMessageRepository.java`**: Create repository for `ContactMessage`.
- **[NEW] `service/ContactService.java` & `service/impl/ContactServiceImpl.java`**: Create service layer for saving contact messages.
- **[NEW] `controller/ContactController.java`**: Create endpoint `POST /api/contact` to accept contact form submissions.

---

### Frontend Enhancements

#### `frontend/src/`
- **[MODIFY] `services/blogService.js`**: Add `searchBlogs(keyword)` and `getBlogsByCategory(category)` functions. Create `services/contactService.js` for submitting contact forms.
- **[MODIFY] `App.jsx`**: Add new routes for `/about`, `/contact`, update `/privacy` to `/privacy-policy`, and ensure `/terms` is registered.
- **[MODIFY] `pages/BlogList.jsx`**: Implement Search bar component that triggers backend search, and Category filter buttons that fetch blogs by category.
- **[MODIFY] `pages/CreateBlog.jsx` & `pages/EditBlog.jsx`**: Replace the category text input with a `<select>` dropdown containing the specified categories (Technology, Programming, DSA, Java, Spring Boot, Web Development, Career, Other).
- **[MODIFY] `components/BlogCard.jsx` & `pages/BlogDetails.jsx`**: Add a prominent Category Badge and calculate/display Reading Time (based on 200 wpm).
- **[NEW] `utils/readingTime.js`**: Create a utility function to calculate reading time from blog content.
- **[MODIFY] `pages/PrivacyPolicy.jsx`**: Update the existing privacy policy content to strictly match the requested headings (Data Collection, Data Usage, User Rights, etc.) and rename file/route if needed.
- **[MODIFY] `pages/TermsOfService.jsx`**: Update the existing terms content to match requested headings (User Responsibilities, Content Policy, Account Policy, Liability Disclaimer).
- **[NEW] `pages/About.jsx`**: Create About Us page with Mission Statement, Tech Stack, and Developer sections.
- **[NEW] `pages/Contact.jsx`**: Create Contact page with form validation, toast notifications, and integration with the new backend endpoint.
- **[MODIFY] `components/Footer.jsx`**: Update footer links structure to exact specification (Explore, Company, Legal) with working links.

---

### Documentation Enhancements

#### `e:\BlogSphere\`
- **[MODIFY] `README.md`**: Add the requested `## Screenshots` section with placeholder paths (`./screenshots/home.png`, etc.) and the `## Live Demo` section with placeholder Vercel/Render URLs.

## Verification Plan

### Automated/Manual Verification
- Verify the Spring Boot backend restarts successfully without compilation errors.
- Test the new `/api/blogs/category/{category}` and `/api/contact` endpoints.
- Navigate to the frontend UI and verify the Search bar and Category filters work correctly on the Browse Blogs page.
- Test blog creation/editing to ensure the Category dropdown functions correctly.
- Verify the Reading Time calculation appears accurately on Blog Cards and Details pages.
- Navigate to all new and updated pages (`/about`, `/contact`, `/privacy-policy`, `/terms`) to verify content and responsiveness.
- Test the Contact form submission for proper validation and toast notifications.
