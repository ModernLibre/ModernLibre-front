'use client'

import { UserList } from "@/components/user-list"
import { DashboardNav } from "@/components/dashboard-nav"

export default function UsersPage() {
  return (
    <>
      <DashboardNav />
      <UserList />
    </>
  )
}