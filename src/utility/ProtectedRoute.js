/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'

export function ProtectedRoute({ user }) {
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
