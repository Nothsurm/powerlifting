import { useState } from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

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
    <div className={ navbar ? "flex justify-around fixed z-20 text-zinc-800 items-center shadow-xl bg-zinc-400 h-20 transition-all duration-200 w-full opacity-85" : "flex justify-around fixed z-20 text-zinc-800 items-center shadow-xl bg-zinc-400 h-32 transition-all duration-200 w-full"}>
      <div className="text-3xl font-bold">
        <h1>
          <Link to='/'>
            <span className='text-blue-500'>POWER</span>LIFTING
          </Link>
        </h1>
      </div>
      <div className="">
        <Link to='/signin'>
          <Button className='bg-blue-500 hover:bg-blue-600'>Login / Register</Button>
        </Link>
      </div>
    </div>
  )
}
