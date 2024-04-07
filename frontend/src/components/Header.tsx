import React, { useState } from 'react'

export default function Header() {
    const [navbar, setNavbar] = useState(false)

    const changeBackground = () => {
        if (window.scrollY > 90) {
          setNavbar(true)
        } else {
          setNavbar(false)
        }
      }
    
      window.addEventListener('scroll', changeBackground)
  return (
    <div className={ navbar ? "flex justify-around fixed z-20 text-stone-300 items-center shadow-xl bg-zinc-400 h-20 transition-all duration-200 w-full opacity-85" : "flex justify-around fixed z-20 text-stone-300 items-center shadow-xl bg-zinc-400 h-32 transition-all duration-200 w-full"}>

    </div>
  )
}
