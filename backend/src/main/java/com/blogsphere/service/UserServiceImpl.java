package com.blogsphere.service;

import com.blogsphere.dto.UserDTO;
import com.blogsphere.dto.UserProfileUpdateRequest;
import com.blogsphere.entity.User;
import com.blogsphere.exception.ResourceNotFoundException;
import com.blogsphere.mapper.UserMapper;
import com.blogsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return UserMapper.toDTO(user);
    }

    @Override
    @Transactional
    public UserDTO updateUserProfile(String email, UserProfileUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        // 1. Update name
        user.setName(request.getName());

        // 2. Conditionally update profile image
        if (request.getProfileImage() != null && !request.getProfileImage().trim().isEmpty()) {
            user.setProfileImage(request.getProfileImage());
        }

        // 3. Conditionally update password if a new one is supplied
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            if (request.getPassword().length() < 6) {
                throw new IllegalArgumentException("Password must be at least 6 characters long");
            }
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return UserMapper.toDTO(updatedUser);
    }
}
