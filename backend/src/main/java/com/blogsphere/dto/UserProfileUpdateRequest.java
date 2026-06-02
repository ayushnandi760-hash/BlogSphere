package com.blogsphere.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserProfileUpdateRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    private String name;

    @Size(max = 512, message = "Profile image URL cannot exceed 512 characters")
    private String profileImage;

    // Optional field: if blank/null, password is not updated
    private String password;

    public UserProfileUpdateRequest() {}

    public UserProfileUpdateRequest(String name, String profileImage, String password) {
        this.name = name;
        this.profileImage = profileImage;
        this.password = password;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
