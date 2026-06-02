package com.blogsphere.dto;

import java.time.LocalDateTime;

public class BlogDTO {
    private Long id;
    private String title;
    private String content;
    private String category;
    private String coverImage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserDTO author;

    public BlogDTO() {}

    public BlogDTO(Long id, String title, String content, String category, String coverImage,
                   LocalDateTime createdAt, LocalDateTime updatedAt, UserDTO author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.coverImage = coverImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.author = author;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public UserDTO getAuthor() { return author; }
    public void setAuthor(UserDTO author) { this.author = author; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String title;
        private String content;
        private String category;
        private String coverImage;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private UserDTO author;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder content(String content) { this.content = content; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder coverImage(String coverImage) { this.coverImage = coverImage; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        public Builder author(UserDTO author) { this.author = author; return this; }

        public BlogDTO build() {
            return new BlogDTO(id, title, content, category, coverImage, createdAt, updatedAt, author);
        }
    }
}
