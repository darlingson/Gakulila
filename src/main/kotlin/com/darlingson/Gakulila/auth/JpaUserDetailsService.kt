package com.darlingson.Gakulila.auth

import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class JpaUserDetailsService(
    private val userRepository: UserRepository,
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsernameWithAuthorities(username)
            ?: throw UsernameNotFoundException("Unknown user: $username")

        val authorities = buildList {
            user.roles.forEach { add(SimpleGrantedAuthority("ROLE_${it.name}")) }
            user.roles.forEach { role ->
                role.permissions.forEach { add(SimpleGrantedAuthority(it.name)) }
            }
        }

        return User(user.username, user.passwordHash, authorities)
    }
}