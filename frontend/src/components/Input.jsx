import React from 'react'
export default function Input({placeValue}) {
  return (
    <input type="text" className="border-solid border rounded-sm border-slate-300 pl-1 h-5 w-full outline-none transition duration-20000 ease-linear focus:border focus:border-black " placeholder={placeValue} style={{fontSize:"9px"}}/>
  )
}
