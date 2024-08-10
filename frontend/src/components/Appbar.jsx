import UserSign from "./UserSign"
export default function Appbar() {
  return (
    <div className="flex justify-between items-center shadow p-2">
        <div className="text-xl">Kuber Bank</div>
        <div className="flex items-center">
        <div className="text-xl mr-1">Hello</div>
        <UserSign title={"U"}/>
        </div>
    </div>
  )
}
