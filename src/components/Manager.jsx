import React, { useRef, useState,useEffect } from 'react'

const Manager = () => {
  const inpref = useRef()
  const imgref = useRef()

  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords=localStorage.getItem("passwords")
    if(passwords){
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])
  

  const showPassword = () => {
    if (inpref.current.type === "password") {
      inpref.current.type = "text"
      imgref.current.src = "icons/eye.svg"
    } else {
      inpref.current.type = "password"
      imgref.current.src = "icons/noteye.svg"
    }
  }

  const savePassword = () => {
    setPasswordArray([...passwordArray, form])
    localStorage.setItem("passwords",JSON.stringify([...passwordArray, form]))
    console.log([...passwordArray, form])
  }

  const useHandler = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));

  }

  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

      <div className='heading flex flex-col justify-center items-center'>
        <div className="font-bold logo text-blue-900 text-3xl pt-10 text-center">
          <span className='text-blue-400'>&lt;</span><b>Pass</b><span className='text-blue-400'>OP/&gt;</span>
          <div className='text-gray-500 text-[15px]'>Your own Password Manager</div>
        </div>
      </div>

      <div className="content w-[60%] flex flex-col gap-4 justify-center pt-5 mx-auto relative">
        <input
          value={form.site}
          name="site"
          onChange={useHandler}
          className="common-btn w-full"
          placeholder="Enter Website URL"
          type="url"
          required
        />

        <div className="flex gap-4 w-full">
          <input
            value={form.username}
            name="username"
            onChange={useHandler}
            className="common-btn w-3/4"
            placeholder="Enter Username"

            type="text"
            required
          />
          <div className="relative w-1/4">
            <input
              ref={inpref}
              value={form.password}
              name="password"
              onChange={useHandler}
              className="common-btn w-full pr-10"
              placeholder="Enter Password"
              type="password"
              required
            />
            <img
              ref={imgref}
              src="icons/noteye.svg"
              className="absolute right-3 top-[6px] w-5 h-5 cursor-pointer"
              alt="Show Password"
              onClick={showPassword}
            />
          </div>

        </div>
        <button onClick={savePassword} className='hover:bg-blue-800 mx-auto flex gap-2 justify-center items-center border border-blue-400 bg-blue-900 text-white px-4 py-1 rounded-[20px] w-fit'>
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
