package com.darlingson.Gakulila.auth

import org.springframework.boot.CommandLineRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class AdminSeeder(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val permissionRepository: PermissionRepository,
    private val passwordEncoder: PasswordEncoder,
) : CommandLineRunner {

    override fun run(vararg args: String) {
        if (userRepository.existsByUsername("admin")) return

        val permissions = listOf("places:read", "places:write", "ratings:read", "ratings:write")
            .map { name ->
                permissionRepository.findByName(name)
                    ?: permissionRepository.save(PermissionEntity(name = name))
            }

        val adminRole = roleRepository.findByName("ADMIN")
            ?: roleRepository.save(RoleEntity(name = "ADMIN"))
        adminRole.permissions += permissions
        roleRepository.save(adminRole)

        val adminPassword = System.getenv("ADMIN_PASSWORD").orEmpty().ifBlank { "admin" }
        
        userRepository.save(
            UserEntity(
                username = "admin",
                email = "admin@gakulila.local",
                passwordHash = passwordEncoder.encode(adminPassword) ?: "",
                roles = mutableSetOf(adminRole),
            )
        )
    }
}
