import React from 'react'

const Manager = () => {
  return (
    <div>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

      <div className='heading flex flex-col justify-center items-center'>
        <div className="font-bold logo text-blue-900 text-3xl pt-10 text-center">
          <span className='text-blue-400'>&lt;</span><b>Pass</b><span className='text-blue-400'>OP/&gt;</span>
          <div className='text-gray-500 text-[15px]'>Your own Password Manager</div>
        </div>
      </div>

      <div className="content w-[60%] flex flex-col gap-4 justify-center pt-5 mx-auto relative">
        <input
          className="common-btn w-full"
          placeholder="Enter Website URL"
          type="text"
        />

        <div className="flex gap-4 w-full">
          <input
            className="common-btn w-3/4"
            placeholder="Enter Username"
            type="text"
          />
          <div className="relative w-1/4">
            <input
              className="common-btn w-full pr-10" 
              placeholder="Enter Password"
              type="password"
            />
            <img
              src="icons/eye.svg"
              className="absolute right-3 top-[6px] w-5 h-5 cursor-pointer"
              alt="Show Password"
            />
          </div>

        </div>
        <button className='mx-auto flex gap-2 justify-center items-center border border-blue-400 bg-blue-900 text-white px-4 py-1 rounded-[20px] w-fit'>
          <lord-icon
            src="https://cdn.lordicon.com/navborva.json"
            trigger="hover"
            colors="primary:#ffffff,secondary:#66a1ee"
          ></lord-icon>Add Password</button>
      </div>
    </div>
  )
}

export default Manager
