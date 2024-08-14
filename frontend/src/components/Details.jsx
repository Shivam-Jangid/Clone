import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Details() {
  const [firstName, setfirstName] = useState("");
  const [username, setusername] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mt-1 ml-1 text-base">
      <div className="flex flex-col mb-3">
        <div className=" mb-1 font-medium">First Name</div>
        <input
          onChange={(e) => setfirstName(e.target.value)}
          type="text"
          className="text-sm border-solid border opacity-75 rounded-sm border-slate-300 pl-1 h-7 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black"
          placeholder="Dexa"
        />
      </div>
      <div className="flex flex-col mb-3">
        <div className=" mb-1 font-medium">Last Name</div>
        <input
          type="text"
          onChange={(e) => setlastName(e.target.value)}
          className="text-sm border-solid border opacity-75 rounded-sm border-slate-300 pl-1 h-7 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black"
          placeholder="Meth"
        />
      </div>
      <div className="flex flex-col mb-3">
        <div className=" mb-1 font-medium">Username</div>
        <input
          type="text"
          onChange={(e) => setusername(e.target.value)}
          className="text-sm border-solid border opacity-75 rounded-sm border-slate-300 pl-1 h-7 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black"
          placeholder="dexaMeth"
        />
      </div>
      <div className="flex flex-col mb-3">
        <div className=" mb-1 font-medium">Email</div>
        <input
          type="text"
          onChange={(e) => setemail(e.target.value)}
          className="text-sm border-solid border opacity-75 rounded-sm border-slate-300 pl-1 h-7 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black"
          placeholder="dexa@gmail.com"
        />
      </div>

      <div className="flex flex-col mb-3">
        <div className=" mb-1 font-medium">Password</div>
        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          className="text-sm pt-1 border-solid border opacity-75 rounded-sm border-slate-300 pl-1 h-7 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black"
          placeholder="*****"
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={async () => {
            try {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username,
                  password,
                  firstName,
                  lastName,
                  email,
                }
              );
              console.log(response.data, response.status);
            alert("user has been successfully created please sign in");
              navigate("/signin");
            } catch (err) {
              console.log(err);
              alert("invalid email or user already exists with this email");
            }
          }}
          className="h-10 w-1/4 mb-1 mt-5 text-slate-50 text-base rounded-md transition-all ease-in-out  bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-sm duration-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
