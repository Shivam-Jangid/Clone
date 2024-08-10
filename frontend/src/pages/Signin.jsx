import Heading from "../components/Heading";
import axios from 'axios';
import Bottomwarning from "../components/Bottomwarning";
import Para from "../components/Para";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div className="flex bg-slate-300 justify-center items-center h-screen">
      <div className="flex flex-col bg-cyan-50 w-1/3 h-3/5 shadow-lg rounded-lg">
        <Heading label={"Sign in"} />
        <Para text={"Enter your credentials to get started !!"} />
        <Details
          email={email}
          password={password}
          setemail={setemail}
          setpassword={setpassword}
        ></Details>
      </div>
    </div>
  );
}
function Details({ email, setemail, password, setpassword }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mt-3 mx-5 text-lg">
      <div className="flex flex-col mb-5">
        <div className=" mb-1 font-medium">Email</div>
        <input
          type="text"
          onChange={(e) => {
            console.log(email);
            setemail(e.target.value);
          }}
          className="text-sm border-solid border opacity-75 rounded-sm border-slate-300 pl-1 h-7 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black"
          placeholder="dexa@gmail.com"
        />
      </div>
      <div className="flex flex-col mb-10">
        <div className=" mb-1 font-medium">Password</div>

        <input
          type="password"
          onChange={(e) => {
            console.log(password);
            setpassword(e.target.value);
          }}
          className=" pt-1 border-solid border opacity-75 rounded-sm border-slate-300 pl-1 h-7 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black"
          placeholder="****"
        />
      </div>
      <div className="flex justify-center">
        <button onClick={async ()=>{
          try{
          const response = await axios.post("http://localhost:3000/api/v1/user/signin",{email,password});
          // if(response.status == 200){
            localStorage.setItem("token",response.data.token);
            // }
            // else if(response.status ==403){
              //   alert("invalid email or password");
              // }
              console.log(response);
              navigate('/dashboard')

          }
          catch (err ){
            alert("invalid user or password");
          }
          // console.log(e.target)
        }} className="h-12 w-2/3 mb-2 mt-5 text-slate-50 text-lg rounded-md transition-all ease-in-out  bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-sm duration-700">
          Sign in
        </button>
      </div>
      <Bottomwarning
        label={"Doesn't have an account ? "}
        buttonText={"Sign up"}
        to={"/signup"}
      ></Bottomwarning>
    </div>
  );
}
