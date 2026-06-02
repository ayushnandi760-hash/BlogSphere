package com.blogsphere.service;

import com.blogsphere.dto.UserDTO;
import com.blogsphere.dto.UserProfileUpdateRequest;

public interface UserService {
    
    UserDTO getUserProfile(String email);
    
    UserDTO updateUserProfile(String email, UserProfileUpdateRequest request);
}
