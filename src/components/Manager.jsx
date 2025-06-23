import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const inpref = useRef();
  const imgref = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast('Copied to clipboard', { position: "top-right", autoClose: 3000, theme: "dark" });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (inpref.current.type === "password") {
      inpref.current.type = "text";
      imgref.current.src = "icons/eye.svg";
    } else {
      inpref.current.type = "password";
      imgref.current.src = "icons/noteye.svg";
    }
  };

  const savePassword = () => {
    const { site, username, password } = form;

    if (!site.trim() || !username.trim() || !password.trim()) {
      toast("Please fill out all fields", { position: "top-right", autoClose: 3000, theme: "dark" });
      return;
    }

    if (password.length < 6) {
      toast("Password must be at least 6 characters", { position: "top-right", autoClose: 3000, theme: "dark" });
      return;
    }

    const newEntry = { ...form, id: uuidv4() };
    const updatedArray = [...passwordArray, newEntry];
    setPasswordArray(updatedArray);
    setForm({ site: "", username: "", password: "" });
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
    toast("Password saved!", { position: "top-right", autoClose: 3000, theme: "dark" });
  };

  const useHandler = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const editPassword = (id) => {
    const obj = passwordArray.find(item => item.id === id);
    setForm({ site: obj.site, username: obj.username, password: obj.password });
    const array = passwordArray.filter(item => item.id !== id);
    setPasswordArray(array);
  };

  const deletePassword = (id) => {
    let c = confirm("Do you want to delete this password?");
    if (c) {
      const array = passwordArray.filter(item => item.id !== id);
      setPasswordArray(array);
      localStorage.setItem("passwords", JSON.stringify(array));
      toast('Password deleted!', { position: "top-right", autoClose: 3000, theme: "dark" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='pb-[1px] pt-14 w-full'>

        {/* Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>

        {/* Heading */}
        <div className='heading flex flex-col justify-center items-center px-4'>
          <div className="font-bold logo text-blue-900 text-3xl pt-10 text-center">
            <span className='text-blue-500'>&lt;</span><b>Pass</b><span className='text-blue-500'>OP/&gt;</span>
            <div className='text-gray-500 text-[15px]'>Your own Password Manager</div>
          </div>
        </div>

        {/* Form Section */}
        <div className="content w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex flex-col gap-4 justify-center pt-5 mx-auto relative px-4">

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
                className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
                alt="Show Password"
                onClick={showPassword}
              />
            </div>
          </div>

          <button
            onClick={savePassword}
            className='hover:bg-blue-800 mx-auto flex gap-2 justify-center items-center border border-blue-400 bg-blue-900 text-white px-4 py-1 rounded-[20px] w-fit'
          >
            <lord-icon
              src="https://cdn.lordicon.com/navborva.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#66a1ee"
            ></lord-icon>
            Save Password
          </button>
        </div>
      </div>

      {/* Password Table */}
      <div className="passwords w-full max-w-4xl mx-auto mt-10 px-2 sm:px-4 pb-24">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-4">Your Passwords</h2>

        {passwordArray.length === 0 && <div className='text-center'>No passwords have been entered</div>}

        {passwordArray.length !== 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full border-collapse rounded overflow-hidden shadow-md">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-left border border-blue-200">Website URL</th>
                  <th className="py-3 px-4 text-left border border-blue-200">Username</th>
                  <th className="py-3 px-4 text-left border border-blue-200">Password</th>
                  <th className="py-3 px-4 text-left border border-blue-200">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-blue-400 text-white">
                {passwordArray.map((item, index) => (
                  <tr key={index} className="border border-blue-200">
                    <td className="py-2 px-4 border border-blue-200">
                      <div className="flex flex-col md:flex-row items-center gap-1">
                        <a target="_blank" href={item.site} className="truncate max-w-[150px] block">{item.site}</a>
                        <img onClick={() => copyText(item.site)} className="copy-effects w-5 h-5 md:w-6 md:h-6 cursor-pointer" src="icons/copy.svg" alt="copy button" />
                      </div>
                    </td>
                    <td className="py-2 px-4 border border-blue-200">
                      <div className="flex flex-col md:flex-row items-center gap-1">
                        <span className="truncate max-w-[150px] block">{item.username}</span>
                        <img onClick={() => copyText(item.username)} className="copy-effects w-5 h-5 md:w-6 md:h-6 cursor-pointer" src="icons/copy.svg" alt="copy button" />
                      </div>
                    </td>
                    <td className="py-2 px-4 border border-blue-200">
                      <div className="flex flex-col md:flex-row items-center gap-1">
                        <span className="truncate max-w-[150px] block">{item.password}</span>
                        <img onClick={() => copyText(item.password)} className="copy-effects w-5 h-5 md:w-6 md:h-6 cursor-pointer" src="icons/copy.svg" alt="copy button" />
                      </div>
                    </td>
                    <td className="py-2 px-4 border border-blue-200">
                      <div className="flex flex-col md:flex-row items-center gap-2">
                        <span onClick={() => editPassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#ffffff,secondary:#ffffff"
                          ></lord-icon>
                        </span>
                        <span onClick={() => deletePassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#ffffff"
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Manager;
