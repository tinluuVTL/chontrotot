import React from "react"
import { Outlet } from "react-router-dom"
import { Footer } from "~/components/commons"
import { LogoContainer, Navigation } from "~/components/headers"

const PublicLayout = () => {
  return (
    <main className="bg-white">
      <LogoContainer />
      <Navigation />
      <Outlet />
      <Footer />
    </main>
  )
}

export default PublicLayout
