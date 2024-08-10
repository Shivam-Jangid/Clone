import { Link } from "react-router-dom"
export default function Bottomwarning({label, buttonText, to}) {
  return (
    <div className="text-xs text-slate-500 flex justify-center mb-3 text-base">
        <div>
        {label}
        </div>
        <Link className="underline" to={to}>{buttonText}</Link>
        </div>
  )
}
