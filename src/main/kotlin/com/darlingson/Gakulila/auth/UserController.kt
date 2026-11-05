package com.darlingson.Gakulila.auth

import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/users")
class UserController(
    private val userRepository: UserRepository,
) {

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    fun me(authentication: Authentication): ResponseEntity<UserResponse> {
        val user = userRepository.findByUsernameWithAuthorities(authentication.name)
            ?: return ResponseEntity.notFound().build()

        return ResponseEntity.ok(
            UserResponse(
                username = user.username,
                email = user.email,
                roles = user.roles.map { it.name },
                permissions = user.roles.flatMap { it.permissions.map { p -> p.name } }.distinct(),
            )
        )
    }
}