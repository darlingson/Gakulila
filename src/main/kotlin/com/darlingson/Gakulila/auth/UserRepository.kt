package com.darlingson.Gakulila.auth

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface UserRepository : JpaRepository<UserEntity, Long> {
    fun existsByUsername(username: String): Boolean

    @Query(
        """SELECT u FROM UserEntity u
           LEFT JOIN FETCH u.roles r
           LEFT JOIN FETCH r.permissions
           WHERE u.username = :username"""
    )
    fun findByUsernameWithAuthorities(username: String): UserEntity?
}

interface RoleRepository : JpaRepository<RoleEntity, Long> {
    fun findByName(name: String): RoleEntity?
}

interface PermissionRepository : JpaRepository<PermissionEntity, Long> {
    fun findByName(name: String): PermissionEntity?
}