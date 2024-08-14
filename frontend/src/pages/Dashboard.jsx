import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import User from "../components/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
      const checkUser = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        console.log(response.data);
          const res = await axios.get("http://localhost:3000/api/v1/accounts/balance", {
            headers: { Authorization: localStorage.getItem("token") },
          });
          console.log(res.data.balance);
          setBalance(res.data.balance);
    };
    checkUser(); 
  }, []);

  return (
    <div>
      <Appbar />
      <div className="flex justify-between items-center">
      <Balance balance={balance} />
      <button onClick={()=>{
        alert("Logging out ...")
        localStorage.removeItem("token");
        navigate("/signin");
      }} className="h-8 w-20 mr-2.5 text-sm text-slate-50 mb-1 rounded-md transition ease-in-out  bg-slate-900 hover:scale-110 hover:bg-slate-200 hover:text-slate-900 hover:font-semibold duration-500">
              Log out
            </button>
      </div>
      <User />
    </div>
  );
}
