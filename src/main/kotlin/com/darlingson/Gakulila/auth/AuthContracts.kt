package com.darlingson.Gakulila.auth

data class LoginRequest(
    val username: String,
    val password: String,
)

data class UserResponse(
    val username: String,
    val email: String? = null,
    val roles: List<String> = emptyList(),
    val permissions: List<String> = emptyList(),
)