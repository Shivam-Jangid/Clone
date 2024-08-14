import { useState } from "react";
import Heading from "../components/Heading";
import UserSign from "../components/UserSign";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signin() {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("to");
  const firstName = SearchParams.get("firstName");
  const lastName = SearchParams.get("lastName");
  const [amount,setamount] = useState(0);
  return (
    <div className="flex bg-slate-300 justify-center items-center h-screen">
      <div className="flex flex-col bg-cyan-50 w-1/4 pb-10 shadow-lg rounded-lg">
      <Heading label={"Send Money"}></Heading>
      <div className="flex mx-2 mt-3.5 items-center">
        <UserSign title={firstName[0]}></UserSign>
        <div className="text-2xl ml-3 font-medium">
            {firstName}
        </div>
        <div className="text-2xl ml-2 font-medium">
            {lastName}
        </div>
      </div>
      <div className="text-lg mt-5 ml-3">
            Amount (in Rs)
        </div>
        <div className="mx-3 text-sm mt-2">
          <Input placeValue={"Enter Amount"} setamount={setamount}></Input>
        </div>
        <div className="flex justify-center">
          <Button label={"Initiate transfer"} id={id} amount={amount}></Button>
        </div>
      </div>
    </div>
  );
}
function Input({placeValue,setamount}) {
  return (
    <input type="number" min="0" className="border-solid border rounded-sm border-slate-300 pl-1 h-8 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black " placeholder={placeValue} onChange={(e)=>setamount(e.target.value)}/>
  )
}
function Button({label,amount,id}) {
  const navigate = useNavigate();
  return (
    <button onClick={async ()=>{
      console.log(amount);
      try{
        const response = await axios.post("http://localhost:3000/api/v1/accounts/transfer",{
          to:id,
          amount
        },{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        })
        alert("Your transfer has been done successfully");
        navigate('/dashboard');
      }
      catch(err){
        console.log(err.response.status);
        if(err.response.status === 400){
          alert("Insufficient balance")
        }
        else {
          alert("Some error occcurred , please try again later");
          navigate('/dashboard');
        }
      }
      
     }} className="h-12 w-1/2 mb-2 mt-5 text-slate-50 text-lg rounded-md transition-all ease-in-out  bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-200 hover:text-xl hover:text-sky-950 duration-700">{label}</button>
  )
}
