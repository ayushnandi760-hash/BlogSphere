package com.blogsphere.service;

import com.blogsphere.dto.BlogCreateRequest;
import com.blogsphere.dto.BlogDTO;
import com.blogsphere.dto.BlogUpdateRequest;
import com.blogsphere.entity.Blog;
import com.blogsphere.entity.User;
import com.blogsphere.exception.ResourceNotFoundException;
import com.blogsphere.mapper.BlogMapper;
import com.blogsphere.repository.BlogRepository;
import com.blogsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogMapper blogMapper;

    @Override
    @Transactional
    public BlogDTO createBlog(String authorEmail, BlogCreateRequest request) {
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Author not found with email: " + authorEmail));

        // Default cover banner if none is supplied
        String coverImage = request.getCoverImage();
        if (coverImage == null || coverImage.trim().isEmpty()) {
            coverImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000";
        }

        Blog blog = Blog.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .category(request.getCategory())
                .coverImage(coverImage)
                .author(author)
                .build();

        Blog savedBlog = blogRepository.save(blog);
        return blogMapper.toDTO(savedBlog);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BlogDTO> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(blogMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BlogDTO getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
        return blogMapper.toDTO(blog);
    }

    @Override
    @Transactional
    public BlogDTO updateBlog(Long id, String authorEmail, BlogUpdateRequest request) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));

        User user = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + authorEmail));

        // Ownership Validation: check if active subject is the actual author
        if (!blog.getAuthor().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized: Only the blog author can modify this post!");
        }

        // Apply changes
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setCategory(request.getCategory());

        if (request.getCoverImage() != null && !request.getCoverImage().trim().isEmpty()) {
            blog.setCoverImage(request.getCoverImage());
        }

        Blog updatedBlog = blogRepository.save(blog);
        return blogMapper.toDTO(updatedBlog);
    }

    @Override
    @Transactional
    public void deleteBlog(Long id, String authorEmail) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));

        User user = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + authorEmail));

        // Ownership Validation: check if active subject is the actual author
        if (!blog.getAuthor().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized: Only the blog author can delete this post!");
        }

        blogRepository.delete(blog);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BlogDTO> getBlogsByAuthor(Long authorId) {
        if (!userRepository.existsById(authorId)) {
            throw new ResourceNotFoundException("Author not found with id: " + authorId);
        }

        return blogRepository.findByAuthorId(authorId)
                .stream()
                .map(blogMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BlogDTO> searchBlogs(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllBlogs();
        }

        return blogRepository.searchBlogs(keyword.trim())
                .stream()
                .map(blogMapper::toDTO)
                .collect(Collectors.toList());
    }
}
