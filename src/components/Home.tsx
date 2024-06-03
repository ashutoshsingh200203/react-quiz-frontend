import React, { useEffect, useState } from 'react'
import Quiz from './Quiz';
import Login from './Login';
import { useNavigate } from 'react-router';

export default function Home() {
 const [token , setToken] = useState<string>('')
 useEffect(()=>{
  setToken(localStorage.getItem('token') || '')
 })
  console.log(token)
  const navigate = useNavigate()
  token.length==0 && navigate('/auth/login')
  return (
    <div>
         <Quiz/>
    </div>
  )
}
