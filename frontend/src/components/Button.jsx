export default function Button({label}) {
  return (
    <div>
     <button class="h-6 w-1/3 text-slate-50 mb-1 rounded-md transition ease-in-out  bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-500 ">{label}</button>
    </div>
  )
}
