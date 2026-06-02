package com.blogsphere.service;

import com.blogsphere.dto.BlogCreateRequest;
import com.blogsphere.dto.BlogDTO;
import com.blogsphere.dto.BlogUpdateRequest;

import java.util.List;

public interface BlogService {

    BlogDTO createBlog(String authorEmail, BlogCreateRequest request);

    List<BlogDTO> getAllBlogs();

    BlogDTO getBlogById(Long id);

    BlogDTO updateBlog(Long id, String authorEmail, BlogUpdateRequest request);

    void deleteBlog(Long id, String authorEmail);

    List<BlogDTO> getBlogsByAuthor(Long authorId);

    List<BlogDTO> searchBlogs(String keyword);
}
