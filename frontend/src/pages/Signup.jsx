import React from 'react'
import Bottomwarning from '../components/Bottomwarning'
import Heading from '../components/Heading'
import Para from '../components/Para'
import Details from '../components/Details'
export default function Signup() {
  return (
    <div className='flex bg-slate-300 justify-center items-center h-screen' >
   <div className='flex flex-col bg-cyan-50 w-1/2 rounded-lg h-3/4 my-2 shadow-lg px-2'>
   <Heading label = {"Sign up"}/>
   <Para text = {"Enter your information to get started !!!"}/>
   <Details></Details>
   <Bottomwarning label={"Already have an account ? "} buttonText={"Sign in"} to={'/signin'}></Bottomwarning>
   </div>
   </div>
  )
}
