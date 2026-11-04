package com.darlingson.Gakulila.auth

import jakarta.persistence.*

@Entity
@Table(name = "permission")
class PermissionEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false, unique = true)
    val name: String,
)