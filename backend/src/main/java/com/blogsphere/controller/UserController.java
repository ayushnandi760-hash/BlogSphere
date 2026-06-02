package com.blogsphere.controller;

import com.blogsphere.dto.UserDTO;
import com.blogsphere.dto.UserProfileUpdateRequest;
import com.blogsphere.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserProfile(Principal principal) {
        // principal.getName() extracts the authenticated email subject from JWT Context
        UserDTO userDTO = userService.getUserProfile(principal.getName());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateUserProfile(Principal principal,
                                                     @Valid @RequestBody UserProfileUpdateRequest request) {
        UserDTO userDTO = userService.updateUserProfile(principal.getName(), request);
        return ResponseEntity.ok(userDTO);
    }
}
