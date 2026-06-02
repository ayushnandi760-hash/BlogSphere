package com.blogsphere.repository;

import com.blogsphere.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    
    // Find all blogs written by a specific author
    @Query("SELECT b FROM Blog b JOIN FETCH b.author WHERE b.author.id = :authorId ORDER BY b.createdAt DESC")
    List<Blog> findByAuthorId(@Param("authorId") Long authorId);

    // Fetch all blogs ordered by creation time, eagerly fetching author details to prevent N+1 issues
    @Query("SELECT b FROM Blog b JOIN FETCH b.author ORDER BY b.createdAt DESC")
    List<Blog> findAllByOrderByCreatedAtDesc();

    // Query for multi-field search (title, category, or content) with case-insensitive partial match
    @Query("SELECT b FROM Blog b JOIN FETCH b.author WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(CAST(b.content AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.category) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "ORDER BY b.createdAt DESC")
    List<Blog> searchBlogs(@Param("keyword") String keyword);
}
