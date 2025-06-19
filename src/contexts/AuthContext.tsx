"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User, AuthContextType } from "../types"
import { authApi, ApiError } from "../services/api"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      const response = (await authApi.verifyToken()) as any
      setUser(response.user)
    } catch {
      localStorage.removeItem("token")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = (await authApi.login({ username, password })) as any
      localStorage.setItem("token", response.token)
      setUser(response.user)
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Login failed"
      throw new Error(message)
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = (await authApi.register({
        username,
        email,
        password,
      })) as any
      localStorage.setItem("token", response.token)
      setUser(response.user)
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Registration failed"
      throw new Error(message)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
