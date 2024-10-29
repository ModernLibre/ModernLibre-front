'use client'

import { BookUpload } from "@/components/book-upload"
import { DashboardNav } from "@/components/dashboard-nav"

export default function UploadPage() {
  return (
    <>
      <DashboardNav />
      <BookUpload />
    </>
  )
}