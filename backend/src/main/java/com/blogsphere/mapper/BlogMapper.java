package com.blogsphere.mapper;

import com.blogsphere.dto.BlogDTO;
import com.blogsphere.entity.Blog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BlogMapper {

    @Autowired
    private UserMapper userMapper;

    public BlogDTO toDTO(Blog blog) {
        if (blog == null) {
            return null;
        }

        return BlogDTO.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .content(blog.getContent())
                .category(blog.getCategory())
                .coverImage(blog.getCoverImage())
                .createdAt(blog.getCreatedAt())
                .updatedAt(blog.getUpdatedAt())
                .author(UserMapper.toDTO(blog.getAuthor())) // Eagerly loaded safe author DTO
                .build();
    }
}
