import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-900 flex items-center justify-around p-4 fixed top-0 w-full z-50'>
      <div className="font-bold logo text-white text-2xl">
        <span className='text-blue-400'>&lt;</span><b>Pass</b><span className='text-blue-400'>OP/&gt;</span>
      </div>
      
      <a target="_blank" href="https://github.com/Aditi-Mane/Password-Manager.git">
        <button className='ring ring-white cursor-pointer hover:bg-blue-400 flex gap-1 border border-blue-800 bg-blue-500 justify-center items-center pr-2 p-1 rounded-[25px]'>
          <img className="w-7"src="/icons/github.svg"alt="github icon"></img>
          <span className='text-white'><b>Github</b></span>
        </button>
      </a>
    </nav>
  )
}

export default Navbar
