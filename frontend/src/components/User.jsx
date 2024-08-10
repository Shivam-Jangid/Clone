import { useEffect, useState } from "react";
import axios from "axios";
import UserSign from "./UserSign";
import { useNavigate } from "react-router-dom";
export default function User() {
  const [filter, setfilter] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(
    function () {
      axios
        .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then((response) => {
          console.log(response.data.user);
          setUsers(response.data.user);
        });
      console.log(filter);
    },
    [filter]
  );
  return (
    <div>
      <div className="text-lg p-2 font-medium ml-2">Users</div>
      <div className="mx-4">
        <input
          type="text"
          onChange={(e) => {
            setfilter(e.target.value);
            console.log(filter);
          }}
          className="text-sm border-solid border rounded-sm border-slate-300 pl-1 h-7 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black "
          placeholder="Search here"
        />
      </div>
      <div className="flex p-4 flex-col">
        {users.map((user) => (
          <RenderUsers user={user} />
        ))}
      </div>
    </div>
  );
}
function RenderUsers({ user }) {
  const navigate = useNavigate();
  let userletter = user.firstName;
  userletter = userletter[0];
  userletter = userletter.toUpperCase();
  console.log(userletter);
  return (
    <>
      <div className="flex items-center w-full mb-1">
        <UserSign title={userletter} />
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <div className="ml-2 text-lg text-slate-700">{user.firstName}</div>
            <div className="ml-1 text-lg text-slate-700">{user.lastName}</div>
          </div>
          <div className="pt-2 text-sm w-28">
            <button onClick={()=>{
                console.log(user._id);
                navigate(`/send?to=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`);
            }} className="h-8 w-full text-slate-50 mb-1 rounded-md transition ease-in-out  bg-slate-900 hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 hover:text-slate-900 hover:font-semibold duration-500">
              Send Money
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
