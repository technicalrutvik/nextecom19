// import React from 'react'

import { useState } from "react"
import Link from "next/link"
import baseUrl from '../helper/baseUrl'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'

/**
* @author
* @function signup
**/

const Login = () => {
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const router = useRouter()
  const userLogin = async (e) => {
    e.preventDefault()
   const res= await fetch(`${baseUrl}/api/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })      
    })
     const res2 = await res.json()
     console.log(res2)
     if(res2.error){
      M.toast({html:res2.error,classes:"red"})
     }else{
       cookie.set('token',res2.token)
       cookie.set('user',res2.user)
       router.push('/account')
     }
  }

  return(
    <div className="container card authcard center-align">
      <h3>Login</h3>
      <form onSubmit={(e)=>{userLogin(e)}}>
      <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button className="btn waves-effect waves-light  #1e88e5 blue darken-1" type="submit">Login
      <i className="material-icons right">forward</i>
       </button>
       <Link href="/signup"><a><h5>Don't have account ? </h5></a></Link>
      </form>
     
    </div>
   )

 }

export default Login