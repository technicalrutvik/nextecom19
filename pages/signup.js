// import React from 'react'

import { useState } from "react"
import Link from "next/link"
import baseUrl from '../helper/baseUrl'
import {useRouter} from 'next/router'
import { route } from "next/dist/next-server/server/router"
/**
* @author
* @function signup
**/

const Signup = (props) => {
  const [name,setName] =useState("")
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const router = useRouter()
  const userSignup = async (e)=>{
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/signup`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"

      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    })
    console.log(res)
    const res2=await res.json()
    if(res2.error){
    M.toast({html:res2.error,classes:"red"})
    }else{
    M.toast({html:"success",classes:"green"})
    router.push('/login')
    }
  }
  return(
    <div className="container card authcard center-align">
      <h3>SignUp</h3>
      <form onSubmit={(e)=>userSignup(e)}> 
      <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button className="btn waves-effect waves-light  #1e88e5 blue darken-1" type="submit">SignUp
      <i className="material-icons right">forward</i>
       </button>
       <Link href="/login"><a><h5>Already have account ?</h5></a></Link>
      </form>
    
    </div>
   )

 }

export default Signup