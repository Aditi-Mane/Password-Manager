import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white flex flex-col fixed bottom-0 items-center justify-center p-2 w-full">
      <div className="font-bold logo text-2xl">
        <span className="text-blue-400">&lt;</span><b>Pass</b><span className="text-blue-400">OP/&gt;</span>
      </div>
      <p className="flex items-center text-[15px]">
        Made with (josh)
        <img className="w-10 px-2" src="icons/josh.svg" alt="josh icon" />
        by Aditi Mane via.CWH
      </p>
    </footer>

  )
}

export default Footer

