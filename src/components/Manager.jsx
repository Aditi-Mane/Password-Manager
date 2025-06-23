import React, { useRef, useState, useEffect } from 'react'

const Manager = () => {
  const inpref = useRef()
  const imgref = useRef()

  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText=(text)=>{
    alert (text + " has been copied to clipboard")
    navigator.clipboard.writeText(text)
  }


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
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
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
    <div className='pb-24 pt-14'>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

      <div className='heading flex flex-col justify-center items-center'>
        <div className="font-bold logo text-blue-900 text-3xl pt-10 text-center">
          <span className='text-blue-500'>&lt;</span><b>Pass</b><span className='text-blue-500'>OP/&gt;</span>
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

        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <input
            value={form.username}
            name="username"
            onChange={useHandler}
            className="common-btn w-full lg:w-3/4"
            placeholder="Enter Username"
            type="text"
            required
          />
          <div className="relative w-full lg:w-1/4">
            <input
              ref={inpref}
              value={form.password}
              name="password"
              onChange={useHandler}
              className="common-btn w-full pr-7"
              placeholder="Enter Password"
              type="password"
              required
            />
            <img
              ref={imgref}
              src="icons/noteye.svg"
              className="absolute right-3 top-[6px] w-5 h-5 cursor-pointer bg-transparent"
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
      <div className="passwords w-full max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Your Passwords</h2>
        {passwordArray.length == 0 && <div className='text-center'>No passwords have been entered</div>}
        {passwordArray.length != 0 && <table className="w-full border-collapse rounded overflow-hidden shadow-md">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-4 text-left border border-blue-200">Website URL</th>
              <th className="py-3 px-4 text-left border border-blue-200">Username</th>
              <th className="py-3 px-4 text-left border border-blue-200">Password</th>
            </tr>
          </thead>
          <tbody className="bg-blue-400 text-white">
            {passwordArray.map((item, index) => {
              return <tr key={index} className="border border-blue-200">
                <td className="py-2 px-4 border border-blue-200">
                  <div className="flex items-center gap-1">
                    <a target="_blank" href={item.site} className="truncate">{item.site}</a>
                    <img onClick={()=>{copyText(item.site)}} className="copy-effects" src="icons/copy.svg" alt="copy button" />
                  </div>
                </td>
                <td className="py-2 px-4 border border-blue-200">
                  <div className="flex items-center gap-1">
                    <span>{item.username}</span>
                    <img onClick={()=>{copyText(item.username)}} className="copy-effects" src="icons/copy.svg" alt="copy button" />
                  </div>
                </td>
                <td className="py-2 px-4 border border-blue-200">
                  <div className="flex items-center gap-1">
                    <span>{item.password}</span>
                    <img onClick={()=>{copyText(item.password)}} className="copy-effects" src="icons/copy.svg" alt="copy button" />
                  </div>
                </td>
              </tr>

            })}

          </tbody>
        </table>}
      </div>

    </div>
  )
}

export default Manager
