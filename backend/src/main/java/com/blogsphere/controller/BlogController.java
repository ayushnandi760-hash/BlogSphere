package com.blogsphere.controller;

import com.blogsphere.dto.BlogCreateRequest;
import com.blogsphere.dto.BlogDTO;
import com.blogsphere.dto.BlogUpdateRequest;
import com.blogsphere.dto.MessageResponse;
import com.blogsphere.service.BlogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping
    public ResponseEntity<BlogDTO> createBlog(Principal principal,
                                             @Valid @RequestBody BlogCreateRequest request) {
        BlogDTO blogDTO = blogService.createBlog(principal.getName(), request);
        return new ResponseEntity<>(blogDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BlogDTO>> getAllBlogs() {
        List<BlogDTO> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable Long id) {
        BlogDTO blogDTO = blogService.getBlogById(id);
        return ResponseEntity.ok(blogDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogDTO> updateBlog(@PathVariable Long id,
                                             Principal principal,
                                             @Valid @RequestBody BlogUpdateRequest request) {
        BlogDTO blogDTO = blogService.updateBlog(id, principal.getName(), request);
        return ResponseEntity.ok(blogDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteBlog(@PathVariable Long id,
                                                      Principal principal) {
        blogService.deleteBlog(id, principal.getName());
        return ResponseEntity.ok(new MessageResponse("Blog post deleted successfully!"));
    }

    @GetMapping("/search")
    public ResponseEntity<List<BlogDTO>> searchBlogs(@RequestParam(value = "keyword", required = false) String keyword) {
        List<BlogDTO> blogs = blogService.searchBlogs(keyword);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<BlogDTO>> getBlogsByAuthor(@PathVariable Long authorId) {
        List<BlogDTO> blogs = blogService.getBlogsByAuthor(authorId);
        return ResponseEntity.ok(blogs);
    }
}
