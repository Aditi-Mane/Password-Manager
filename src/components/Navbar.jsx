import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-900 flex items-center justify-around p-4'>
      <div className="font-bold logo text-white text-2xl">
        <span className='text-blue-400'>&lt;</span><b>Pass</b><span className='text-blue-400'>OP/&gt;</span>
      </div>
      <div className="paths">
        <ul>
          <li className="flex gap-4 text-white">
            <a className="hover:text-blue-300"href="#">Home</a>
            <a className="hover:text-blue-300"href="#">About</a>
            <a className="hover:text-blue-300"href="#">Contact</a>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
